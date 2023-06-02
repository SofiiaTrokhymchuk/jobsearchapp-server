const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    locationName: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Location", LocationSchema);
