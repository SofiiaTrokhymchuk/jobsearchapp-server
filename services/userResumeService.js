const Resume = require("../models/Resume.js");
const User = require("../models/User.js");
const Location = require("../models/Location.js");

const getResume = async (userId) => {
  const jobseeker = await User.findById(userId).populate("role");
  const resume = await Resume.findOne({
    jobseekerId: jobseeker._id,
  }).populate("desiredJobLocation");
  return resume;
};

const createResume = async (resumeData, userId) => {
  const { desiredJobLocation, position, skills, experience } = resumeData;
  const jobseeker = await User.findById(userId).populate("role");
  const locationModel = await Location.findById(desiredJobLocation);
  const resume = new Resume({
    jobseekerId: jobseeker._id,
    desiredJobLocation: locationModel._id,
    position,
    skills,
    experience,
  });
  await resume.save();
  return { status: 201, data: resume };
};

const updateResume = async (resumeData, userId) => {
  const { position, skills, experience, desiredJobLocation } = resumeData;
  const jobseeker = await User.findById(userId).populate("role");
  const resume = await Resume.findOneAndUpdate(
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
  );
  return resume;
};
const deleteResume = async (userId) => {
  const jobseeker = await User.findById(userId).populate("role");
  const resume = await Resume.findOneAndDelete({
    jobseekerId: jobseeker._id,
  });
  if (!resume) {
    return { message: "Резюме не знайдено" };
  } else {
    return { message: "Резюме видалено" };
  }
};

module.exports = { getResume, createResume, updateResume, deleteResume };
