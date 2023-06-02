const Category = require("../models/Category.js");
const Location = require("../models/Location.js");
const User = require("../models/User.js");
const Vacancy = require("../models/Vacancy.js");
//const isValidObjectId = require("../utils/isValidObjectIdUtil.js");

const createVacancy = async (req, res) => {
  try {
    const {
      position,
      category,
      jobLocation,
      salary,
      experience,
      education,
      description,
    } = req.body;
    console.log(req.user.id);
    const employer = await User.findById(req.user.id).populate("role");
    const categoryModel = await Category.findById(category);
    const locationModel = await Location.findById(jobLocation);

    const vacancy = new Vacancy({
      employerId: employer._id,
      position,
      category: categoryModel._id,
      jobLocation: locationModel._id,
      salary,
      experience,
      education,
      description,
    });
    await vacancy.save();
    res.status(201).json({ vacancy });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося створити вакансію" });
  }
};

const getAllVacancies = async (req, res) => {
  try {
    const employer = await User.findById(req.user.id);
    const vacancies = await Vacancy.find({ employerId: employer._id })
      .populate("category")
      .populate("jobLocation");
    if (vacancies.length > 0) {
      res.json({ vacancies });
    } else {
      res.json({ message: "Вакансії не знайдено" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансії" });
  }
};

const getOneVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id)
      .populate("employerId")
      .populate("category")
      .populate("jobLocation");
    if (!vacancy) {
      return res.status(404).json({ message: "Вакансію не знайдено" });
    }
    res.json({ vacancy });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансію" });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const {
      position,
      category,
      jobLocation,
      salary,
      experience,
      education,
      description,
    } = req.body;
    await Vacancy.findByIdAndUpdate(
      req.params.id,
      {
        position,
        category,
        jobLocation,
        salary,
        experience,
        education,
        description,
      },
      { new: true }
    )
      .populate("employerId")
      .then((vacancy) => {
        if (!vacancy) {
          return res.status(404).json({ message: "Вакансію не знайдено" });
        } else {
          return res.json({ vacancy });
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансію" });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    console.log(req.params.id);
    await Vacancy.findByIdAndDelete(req.params.id).then((vacancy) => {
      if (!vacancy) {
        return res.status(404).json({ message: "Вакансію не знайдено" });
      } else {
        console.log(vacancy);
        return res.json({ message: "Вакансію видалено" });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося видалити вакансію" });
  }
};

module.exports = {
  createVacancy,
  getAllVacancies,
  getOneVacancy,
  updateVacancy,
  deleteVacancy,
};
