const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/userResumeController.js");
const validator = require("../utils/validator.js");
const handleValidationErrors = require("../utils/handleValidationErrors.js");
/*
    full path: jobseeker/account -> /resume
*/
router.post(
  "/",
  validator.resumeValidator,
  handleValidationErrors,
  resumeController.createResume
);
router.get("/", resumeController.getResume);
router.patch(
  "/",
  validator.resumeValidator,
  handleValidationErrors,
  resumeController.updateResume
);
router.delete("/", resumeController.deleteResume);

module.exports = router;
