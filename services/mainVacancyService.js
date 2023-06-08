const Vacancy = require("../models/Vacancy.js");

const getAllVacancies = async (query) => {
  let vacancies = await Vacancy.find({})
    .populate("employerId")
    .populate("jobLocation")
    .populate("category");
  console.log(query);
  Object.keys(query).map((key) => {
    if (key === "jobLocation") {
      vacancies = vacancies.filter((vacancy) => {
        return query[key] === vacancy.jobLocation._id.toString();
      });
    }
    if (key === "position") {
      vacancies = vacancies.filter((vacancy) => {
        return vacancy.position
          .toLowerCase()
          .includes(query[key].toLowerCase());
      });
    }
    if (key === "category") {
      vacancies = vacancies.filter((vacancy) => {
        return query[key] === vacancy.category._id.toString();
      });
    }
    if (key === "salary") {
      vacancies = vacancies.filter((vacancy) => {
        return vacancy.salary >= Number(query[key]);
      });
    }
  });
  return vacancies;
};

const getOneVacancy = async (id) => {
  const vacancy = await Vacancy.findById(id)
    .populate("employerId")
    .populate("jobLocation")
    .populate("category");
  return vacancy;
};

module.exports = {
  getAllVacancies,
  getOneVacancy,
};
