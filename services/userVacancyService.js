const Category = require("../models/Category.js");
const Location = require("../models/Location.js");
const User = require("../models/User.js");
const Vacancy = require("../models/Vacancy.js");

const getAllVacancies = async (userId) => {
  const employer = await User.findById(userId);
  const vacancies = await Vacancy.find({ employerId: employer._id })
    .populate("category")
    .populate("jobLocation");
  return vacancies;
};

const getOneVacancy = async (vacancyId) => {
  const vacancy = await Vacancy.findById(vacancyId)
    .populate("employerId")
    .populate("category")
    .populate("jobLocation");
  return vacancy;
};

const createVacancy = async (vacancyData, userId) => {
  const {
    position,
    category,
    jobLocation,
    salary,
    experience,
    education,
    description,
  } = vacancyData;
  const employer = await User.findById(userId).populate("role");
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
  return { status: 201, vacancy };
};

const updateVacancy = async (vacancyData, vacancyId) => {
  const {
    position,
    category,
    jobLocation,
    salary,
    experience,
    education,
    description,
  } = vacancyData;
  const vacancy = await Vacancy.findByIdAndUpdate(
    vacancyId,
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
  ).populate("employerId");
  return vacancy;
};

const deleteVacancy = async (vacancyId) => {
  const vacancy = await Vacancy.findByIdAndDelete(vacancyId);
  if (!vacancy) {
    return { message: "Вакансію не знайдено" };
  } else {
    return { message: "Вакансію видалено" };
  }
};

module.exports = {
  getAllVacancies,
  getOneVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy,
};
