const express = require("express");
const router = express.Router();
const mainVacancyController = require("../controllers/mainVacancyController.js");
const roleMiddleware = require("../utils/roleMiddleware.js");

router.get("/", mainVacancyController.getAllVacancies);
router.get("/:id", mainVacancyController.getOneVacancy);

module.exports = router;
