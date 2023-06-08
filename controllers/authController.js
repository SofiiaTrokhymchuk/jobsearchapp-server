const AuthService = require("../services/authService");

const registration = async (req, res, userRoleName) => {
  try {
    const registrationRes = await AuthService.registration(
      req.body,
      userRoleName
    );
    if (registrationRes.success) {
      return res
        .status(registrationRes.status)
        .json({ userData: registrationRes.data });
    } else {
      return res
        .status(registrationRes.status)
        .json({ message: registrationRes.message });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Помилка реєстрації" });
  }
};

const login = async (req, res) => {
  try {
    const loginRes = await AuthService.login(req.body);
    const { status, resData } = loginRes;
    return res.status(status).json({ resData });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Помилка входу" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const verifyUserRes = await AuthService.verifyUser(
      req.params.confirmationCode
    );
    return res
      .status(verifyUserRes.status)
      .json({ message: verifyUserRes.message });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не вдалося підтвердити користувача" });
  }
};

module.exports = {
  jobseekerRegistration: (req, res) => registration(req, res, "JOBSEEKER"),
  employerRegistration: (req, res) => registration(req, res, "EMPLOYER"),
  login,
  verifyUser,
};
