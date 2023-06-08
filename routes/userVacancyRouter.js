const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/userVacancyController");
const validator = require("../utils/validator.js");
const handleValidationErrors = require("../utils/handleValidationErrors.js");

router.post(
  "/",
  validator.vacancyValidator,
  handleValidationErrors,
  vacancyController.createVacancy
);
router.get("/", vacancyController.getAllVacancies);
router.get("/:id", vacancyController.getOneVacancy);
router.patch(
  "/:id",
  validator.vacancyValidator,
  handleValidationErrors,
  vacancyController.updateVacancy
);
router.delete("/:id", vacancyController.deleteVacancy);

module.exports = router;
