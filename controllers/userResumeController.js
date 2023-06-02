const Resume = require("../models/Resume.js");
const User = require("../models/User.js");
const Location = require("../models/Location.js");

const createResume = async (req, res) => {
  try {
    const { desiredJobLocation, position, skills, experience } = req.body;
    const jobseeker = await User.findById(req.user.id).populate("role");
    const locationModel = await Location.findById(desiredJobLocation);
    const resume = new Resume({
      jobseekerId: jobseeker._id,
      desiredJobLocation: locationModel._id,
      position,
      skills,
      experience,
    });
    await resume.save();
    res.status(201).json({ resume });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося створити резюме" });
  }
};

const getResume = async (req, res) => {
  try {
    const jobseeker = await User.findById(req.user.id).populate("role");
    const resume = await Resume.findOne({
      jobseekerId: jobseeker._id,
    }).populate("desiredJobLocation");
    res.json({ resume });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути резюме" });
  }
};

const updateResume = async (req, res) => {
  try {
    const { position, skills, experience, desiredJobLocation } = req.body;
    const jobseeker = await User.findById(req.user.id).populate("role");
    await Resume.findOneAndUpdate(
      {
        jobseekerId: jobseeker._id,
      },
      {
        position,
        skills,
        desiredJobLocation,
        experience,
      },
      { new: true }
    ).then((resume) => {
      if (!resume) {
        return res.status(404).json({ message: "Резюме не знайдено" });
      } else {
        return res.json({ resume });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося оновити резюме" });
  }
};

const deleteResume = async (req, res) => {
  try {
    const jobseeker = await User.findById(req.user.id).populate("role");
    await Resume.findOneAndDelete({
      jobseekerId: jobseeker._id,
    }).then((resume) => {
      if (!resume) {
        return res.status(404).json({ message: "Резюме не знайдено" });
      } else {
        return res.json({ message: "Резюме видалено" });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося видалити резюме" });
  }
};

module.exports = {
  createResume,
  getResume,
  updateResume,
  deleteResume,
};
