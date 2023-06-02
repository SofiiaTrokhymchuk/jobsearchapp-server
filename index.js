const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const roleMiddleware = require("./utils/roleMiddleware.js");
const authMiddleware = require("./utils/authMiddleware.js");
const authRouter = require("./routes/authRouter.js");
const userResumeRouter = require("./routes/userResumeRouter.js");
const userVacancyRouter = require("./routes/userVacancyRouter.js");
const mainResumeRouter = require("./routes/mainResumeRouter.js");
const mainVacancyRouter = require("./routes/mainVacancyRouter.js");
const filterRouter = require("./routes/filterRouter.js");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", filterRouter);
app.use("/", authRouter);
app.use("/resumes", mainResumeRouter);
app.use("/vacancies", mainVacancyRouter);
app.use(
  "/account/jobseeker",
  [authMiddleware, roleMiddleware("JOBSEEKER")],
  userResumeRouter
);
app.use(
  "/account/employer",
  [authMiddleware, roleMiddleware("EMPLOYER")],
  userVacancyRouter
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conected to DB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.listen(PORT, () => console.log("Server started", new Date()));
