const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Role = require("../models/Role.js");
const User = require("../models/User.js");

require("dotenv").config();

const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });
};

const registration = async (req, res, userRoleName) => {
  try {
    const { email, fullName, phoneNumber, password, ...userAttributes } =
      req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({
        message: `Користувач з електронною поштою ${email} вже існує`,
      });
    }

    if (userRoleName === "EMPLOYER") {
      const { companyName } = userAttributes;
      const employerCandidate = await User.findOne({
        "dynamicUserAttributes.companyName": companyName,
      });
      if (employerCandidate) {
        return res.status(400).json({
          message: `Компанія ${companyName} вже зареєстрована`,
        });
      }
    }

    const userRole = await Role.findOne({ roleName: userRoleName });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      fullName,
      email,
      phoneNumber,
      passwordHash,
      role: userRole._id,
      dynamicUserAttributes: {
        ...userAttributes,
      },
    });
    await user.save();
    res.status(201).json({ message: "Користувач був успішно зареєстрований!" });

    // const session = await mongoose.startSession();
    // try {
    //   session.startTransaction();
    //   const user = new User({
    //     fullName,
    //     email,
    //     phoneNumber,
    //     passwordHash,
    //     role: userRole._id,
    //   });
    // const userRoleModel = new UserRoleModel({
    //   userId: user._id,
    //   ...userAttributes,
    // });
    //   await user.save({ session });
    //   await userRoleModel.save({ session });
    //   await session.commitTransaction();
    //   session.endSession();
    //   const token = generateAccessToken(user._id, user.role.roleName);
    //   res.status(201).json({ user, userRoleModel, token });
    // } catch (e) {
    //   await session.abortTransaction();
    //   session.endSession();
    //   res.status(500).json({ message: "Помилка реєстрації" });
    // }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Помилка реєстрації" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role");
    let validPassword = false;
    if (user) {
      validPassword = await bcrypt.compare(password, user.passwordHash);
    }
    if (!user || !validPassword) {
      return res
        .status(400)
        .json({ message: "Введені неправильно електронна пошта або пароль" });
    }
    const token = generateAccessToken(user._id, user.role.roleName);
    return res.json({ user, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Помилка входу" });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json({ roles });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  jobseekerRegistration: (req, res) => registration(req, res, "JOBSEEKER"),
  employerRegistration: (req, res) => registration(req, res, "EMPLOYER"),
  login,
  getRoles,
};
