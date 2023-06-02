const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");

router.get("/categories", filterController.getCategories);
router.get("/locations", filterController.getLocations);

module.exports = router;
