const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (role) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Користувач не авторизований" });
      }
      decodedUserData = req.user;
      let userHasAllowedRole = false;
      if (role === decodedUserData.role) {
        userHasAllowedRole = true;
      }
      if (!userHasAllowedRole) {
        return res
          .status(403)
          .json({ message: "Доступ до сторінки заборонений" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res
        .status(403)
        .json({ message: "Доступ до сторінки заборонений" });
    }
  };
};
