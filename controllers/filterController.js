const FilterService = require("../services/filterService.js");

const getCategories = async (req, res) => {
  try {
    const categories = await FilterService.getCategories();
    res.json({ categories });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося отримати категорії" });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await FilterService.getLocations();
    res.json({ locations });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося отримати локації" });
  }
};

module.exports = { getCategories, getLocations };
