const MainVacancyService = require("../services/mainVacancyService.js");

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await MainVacancyService.getAllVacancies(req.query);
    res.json({ vacancies });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансії" });
  }
};

const getOneVacancy = async (req, res) => {
  try {
    const vacancy = await MainVacancyService.getOneVacancy(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: "Вакансію не знайдено" });
    } else {
      return res.json({ vacancy });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося переглянути вакансію" });
  }
};

module.exports = {
  getAllVacancies,
  getOneVacancy,
};
