const Category = require("../models/Category.js");
const Location = require("../models/Location.js");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories });
  } catch (e) {
    console.log(e);
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json({ locations });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getCategories, getLocations };
