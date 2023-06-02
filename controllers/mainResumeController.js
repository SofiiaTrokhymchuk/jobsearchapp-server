const { query } = require("express");
const Resume = require("../models/Resume.js");
const User = require("../models/User.js");

const getAllResumes = async (req, res) => {
  try {
    let resumes = await Resume.find({})
      .populate("jobseekerId")
      .populate("desiredJobLocation");
    Object.keys(req.query).map((key) => {
      if (key === "desiredJobLocation") {
        resumes = resumes.filter((resume) => {
          return req.query[key] === resume.desiredJobLocation._id.toString();
        });
      }
      if (key === "position") {
        resumes = resumes.filter((resume) => {
          return resume.position
            .toLowerCase()
            .includes(req.query[key].toLowerCase());
        });
      }
    });
    // if (resumes.length === 0) {
    //   return res.status(404).json({ message: "Резюме не знайдено" });
    // } else {
    //   return res.json({ resumes });
    // }
    return res.json({ resumes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути резюме" });
  }
};

const getOneResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
      .populate("jobseekerId")
      .populate("desiredJobLocation");
    if (!resume) {
      return res.status(404).json({ message: "Резюме не знайдено" });
    } else {
      return res.json({ resume });
    }
    // await Resume.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $inc: { viewsCount: 1 },
    //   },
    //   { new: true }
    // )
    //   .populate("jobseekerId")
    //   .then((resume) => {
    //     if (!resume) {
    //       return res.status(404).json({ message: "Резюме не знайдено" });
    //     } else {
    //       return res.json({ resume });
    //     }
    //   });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути резюме" });
  }
};

module.exports = {
  getAllResumes,
  getOneResume,
};
