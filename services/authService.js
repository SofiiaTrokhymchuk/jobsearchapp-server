const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailerConfig = require("../utils/nodemailerConfig");

const Role = require("../models/Role.js");
const User = require("../models/User.js");

require("dotenv").config();

const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });
};

const deleteUnverifiedUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (user.status === "Pending") {
      await User.findByIdAndDelete(user._id).then((user) => {
        console.log(user);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email }).populate("role");
  if (user && user.status !== "Active") {
    return {
      success: false,
      status: 400,
      resData: "Підтвердіть свою електронну пошту!",
    };
  }
  let validPassword = false;
  if (user) {
    validPassword = await bcrypt.compare(password, user.passwordHash);
  }
  if (!user || !validPassword) {
    return {
      success: false,
      status: 400,
      resData: "Введені неправильно електронна пошта або пароль",
    };
  }
  const token = generateAccessToken(user._id, user.role.roleName);
  return {
    success: true,
    status: 200,
    resData: { user, token },
  };
};

const registration = async (userData, userRoleName) => {
  const { email, fullName, phoneNumber, password, ...userAttributes } =
    userData;

  const candidate = await User.findOne({ email });
  if (candidate) {
    return {
      success: false,
      status: 400,
      message: `Користувач з електронною поштою ${email} вже існує`,
    };
  }

  if (userRoleName === "EMPLOYER") {
    const { companyName } = userAttributes;
    const employerCandidate = await User.findOne({
      "dynamicUserAttributes.companyName": companyName,
    });
    if (employerCandidate) {
      return {
        success: false,
        status: 400,
        message: `Компанія ${companyName} вже зареєстрована`,
      };
    }
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  console.log(token);
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
    confirmationCode: token,
  });
  await user.save();
  nodemailerConfig.sendConfirmationEmail(
    user.fullName,
    user.email,
    user.confirmationCode
  );

  setTimeout(() => deleteUnverifiedUser(user._id), 1000 * 60 * 15);
  return {
    success: true,
    status: 201,
    data: "Користувач був успішно зареєстрований! Будь-ласка, перевірте свою електронну пошту для підтвердження",
  };
};

const verifyUser = async (confirmationCode) => {
  const user = await User.findOne({
    confirmationCode,
  });
  if (!user) {
    //return res.status(404).json({ message: "Користувача не знайдено" });
    return {
      status: 404,
      message: "Користувача не знайдено",
    };
  }
  user.status = "Active";
  await user.save();
  return {
    status: 200,
    message: "Користувача підтверджено",
  };
};

module.exports = {
  login,
  registration,
  verifyUser,
};
