const mongoose = require("mongoose");

const VacancySchema = mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    jobLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    // education: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    // viewsCount: {
    //   type: Number,
    //   default: 0,
    // },
    // responseCount: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Vacancy", VacancySchema);
