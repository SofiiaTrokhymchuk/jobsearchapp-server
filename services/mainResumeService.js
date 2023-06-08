const Resume = require("../models/Resume.js");

const getAllResumes = async (query) => {
  let resumes = await Resume.find({})
    .populate("jobseekerId")
    .populate("desiredJobLocation");
  Object.keys(query).map((key) => {
    if (key === "desiredJobLocation") {
      resumes = resumes.filter((resume) => {
        return query[key] === resume.desiredJobLocation._id.toString();
      });
    }
    if (key === "position") {
      resumes = resumes.filter((resume) => {
        return resume.position.toLowerCase().includes(query[key].toLowerCase());
      });
    }
  });
  return resumes;
};

const getOneResume = async (id) => {
  const resume = await Resume.findById(id)
    .populate("jobseekerId")
    .populate("desiredJobLocation");
  return resume;
};

module.exports = {
  getAllResumes,
  getOneResume,
};
