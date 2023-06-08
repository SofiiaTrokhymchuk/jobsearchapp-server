const Category = require("../models/Category.js");
const Location = require("../models/Location.js");

const getCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

const getLocations = async () => {
  const locations = await Location.find({});
  return locations;
};

module.exports = {
  getCategories,
  getLocations,
};
