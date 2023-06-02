const express = require("express");
const router = express.Router();
const mainResumeController = require("../controllers/mainResumeController.js");

router.get("/", mainResumeController.getAllResumes);
router.get("/:id", mainResumeController.getOneResume);

module.exports = router;
