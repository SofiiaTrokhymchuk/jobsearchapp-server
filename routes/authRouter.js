const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const validator = require("../utils/validator.js");
const handleValidationErrors = require("../utils/handleValidationErrors.js");

router.post(
  "/registration/jobseeker",
  validator.jobseekerRegistrationValidator,
  handleValidationErrors,
  authController.jobseekerRegistration
);
router.post(
  "/registration/employer",
  validator.employerRegistrationValidator,
  handleValidationErrors,
  authController.employerRegistration
);
router.post("/login", validator.loginValidator, authController.login);
router.get("/roles", authController.getRoles);

module.exports = router;
