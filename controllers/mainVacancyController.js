const Resume = require("../models/Resume.js");
const Vacancy = require("../models/Vacancy.js");
const Category = require("../models/Category.js");
const Location = require("../models/Location.js");

const getAllVacancies = async (req, res) => {
  try {
    let vacancies = await Vacancy.find({})
      .populate("employerId")
      .populate("jobLocation")
      .populate("category");
    // if (vacancies.length > 0) {
    //   res.json({ vacancies });
    // } else {
    //   res.status(404).json({ message: "Вакансії не знайдено" });
    // }
    console.log(req.query);
    Object.keys(req.query).map((key) => {
      if (key === "jobLocation") {
        vacancies = vacancies.filter((vacancy) => {
          return req.query[key] === vacancy.jobLocation._id.toString();
        });
      }
      if (key === "position") {
        vacancies = vacancies.filter((vacancy) => {
          return vacancy.position
            .toLowerCase()
            .includes(req.query[key].toLowerCase());
        });
      }
      if (key === "category") {
        vacancies = vacancies.filter((vacancy) => {
          return req.query[key] === vacancy.category._id.toString();
        });
      }
      if (key === "salary") {
        vacancies = vacancies.filter((vacancy) => {
          return vacancy.salary >= Number(req.query[key]);
        });
      }
    });
    res.json({ vacancies });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансії" });
  }
};

const getOneVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id)
      .populate("employerId")
      .populate("jobLocation")
      .populate("category");
    if (!vacancy) {
      return res.status(404).json({ message: "Вакансію не знайдено" });
    } else {
      return res.json({ vacancy });
    }
    // await Vacancy.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $inc: { viewsCount: 1 },
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
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансію" });
  }
};

module.exports = {
  getAllVacancies,
  getOneVacancy,
};
