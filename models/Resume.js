const mongoose = require("mongoose");

const ResumeSchema = mongoose.Schema(
  {
    jobseekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    desiredJobLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },

    // experience: [
    //   {
    //     position: {
    //       type: String,
    //       required: true,
    //     },
    //     companyName: {
    //       type: String,
    //       required: true,
    //     },
    //     fromDate: {
    //       type: Date,
    //       required: true,
    //     },
    //     toDate: {
    //       type: Date,
    //       required: true,
    //     },
    //   },
    // ],
    // viewsCount: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Resume", ResumeSchema);
