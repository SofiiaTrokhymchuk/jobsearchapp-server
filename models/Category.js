const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
