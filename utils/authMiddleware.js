const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Користувач не авторизований" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUserData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Доступ до сторінки заборонений" });
  }
};
