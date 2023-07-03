const UserResumeService = require("../services/userResumeService.js");

const createResume = async (req, res) => {
  try {
    const createResumeRes = await UserResumeService.createResume(
      req.body,
      req.user.id
    );
    const { status, data } = createResumeRes;
    res.status(status).json({ data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося створити резюме" });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await UserResumeService.getResume(req.user.id);
    res.json({ resume });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути резюме" });
  }
};

const updateResume = async (req, res) => {
  try {
    const updateResumeRes = await UserResumeService.updateResume(
      req.body,
      req.user.id
    );
    return res.json({ resume: updateResumeRes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося оновити резюме" });
  }
};

const deleteResume = async (req, res) => {
  try {
    const deleteResumeRes = await UserResumeService.deleteResume(req.user.id);
    return res.json({ message: deleteResumeRes.message });
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
