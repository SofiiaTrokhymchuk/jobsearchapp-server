const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Неправильно введена електронна пошта"),
  body("password")
    .isLength({ min: 8 })
    // .withMessage("Пароль має бути більше 8 символів")
    //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
    // .withMessage(
    //   "Пароль має бути від 8 символів і містити принаймні одну велику літеру, одну малу літеру та одну цифру"
    // ),
    .withMessage("Пароль має містити від 8 символів"),
];
const userRegistrationValidator = [
  ...loginValidator,
  body("fullName")
    .isLength({ min: 3, max: 70 })
    .withMessage("Повне ім'я має містити принаймні 3 символи"),
  body("phoneNumber")
    .isMobilePhone("uk-UA")
    .withMessage("Номер телефону має бути правильного формату"),
];

const jobseekerRegistrationValidator = [
  ...userRegistrationValidator,
  body("birthdate")
    .notEmpty()
    .isDate()
    .withMessage("Неправильно введена дата народження"),
];

const employerRegistrationValidator = [
  ...userRegistrationValidator,
  body("companyName")
    .isLength({ min: 3 })
    .withMessage("Назва компанії має містити приніймні 3 символи"),
];

const resumeValidator = [
  body("position")
    .isLength({ min: 3 })
    .withMessage("Посада має містити принаймні 3 символи"),
  body("skills")
    .isLength({ min: 10 })
    .withMessage("Опишіть свої навички з використанням 10 і більше символів"),
  body("experience")
    .isLength({ min: 10 })
    .withMessage(
      "Опишіть свій досвід роботи з використанням 10 і більше символів"
    ),
];

const vacancyValidator = [
  body("position")
    .isLength({ min: 2 })
    .withMessage("Посада має містити принаймні 2 символи"),
  // body("category")
  //   .isLength({ min: 2 })
  //   .withMessage("Категорія має містити принаймні 2 символи"),
  body("salary")
    .isLength({ min: 4 })
    .withMessage("Зарплата має містити принаймні 4 символи"),
  // body("jobLocation")
  //   .isLength({ min: 3 })
  //   .withMessage("Місце роботи має містити принаймні 3 символи"),
  body("experience")
    .isLength({ min: 3 })
    .withMessage("Досвід роботи має містити принаймні 3 символи"),
  // body("education")
  //   .isLength({ min: 4 })
  //   .withMessage("Освіта має містити принаймні 4 символи"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Опишіть вакансію з використанням 10 і більше символів"),
];

module.exports = {
  loginValidator,
  jobseekerRegistrationValidator,
  employerRegistrationValidator,
  resumeValidator,
  vacancyValidator,
};
