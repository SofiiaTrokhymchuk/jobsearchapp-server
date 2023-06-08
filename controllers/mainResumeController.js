const MainResumeService = require("../services/mainResumeService.js");

const getAllResumes = async (req, res) => {
  try {
    const resumes = await MainResumeService.getAllResumes(req.query);
    return res.json({ resumes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути резюме" });
  }
};

const getOneResume = async (req, res) => {
  try {
    const resume = await MainResumeService.getOneResume(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Резюме не знайдено" });
    } else {
      return res.json({ resume });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути резюме" });
  }
};

module.exports = {
  getAllResumes,
  getOneResume,
};
