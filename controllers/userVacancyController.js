const Category = require("../models/Category.js");
const Location = require("../models/Location.js");
const User = require("../models/User.js");
const Vacancy = require("../models/Vacancy.js");
const UserVacancyService = require("../services/userVacancyService.js");

const createVacancy = async (req, res) => {
  try {
    const createVacancyRes = await UserVacancyService.createVacancy(
      req.body,
      req.user.id
    );
    const { status, vacancy } = createVacancyRes;
    res.status(status).json({ vacancy });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося створити вакансію" });
  }
};

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await UserVacancyService.getAllVacancies(req.user.id);
    res.json({ vacancies });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансії" });
  }
};

const getOneVacancy = async (req, res) => {
  try {
    const vacancy = await UserVacancyService.getOneVacancy(req.params.id);
    res.json({ vacancy });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансію" });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const vacancy = await UserVacancyService.updateVacancy(
      req.body,
      req.params.id
    );
    // const {
    //   position,
    //   category,
    //   jobLocation,
    //   salary,
    //   experience,
    //   education,
    //   description,
    // } = req.body;
    // await Vacancy.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     position,
    //     category,
    //     jobLocation,
    //     salary,
    //     experience,
    //     education,
    //     description,
    //   },
    //   { new: true }
    // )
    //   .populate("employerId")
    //   .then((vacancy) => {
    //     if (!vacancy) {
    //       return res.status(404).json({ message: "Вакансію не знайдено" });
    //     } else {
    //       return res.json({ vacancy });
    //     }
    //   });
    return res.json({ vacancy });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансію" });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const deleteVacancyRes = await UserVacancyService.deleteVacancy(
      req.params.id
    );
    res.json({ message: deleteVacancyRes.message });
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
