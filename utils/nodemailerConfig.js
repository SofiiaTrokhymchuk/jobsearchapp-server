const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const apiEmail = process.env.API_EMAIL;
const apiPswd = process.env.API_PSWD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: apiEmail,
    pass: apiPswd,
  },
});

const sendConfirmationEmail = (userFullName, userEmail, confirmationCode) => {
  console.log("Verify email");
  transport
    .sendMail({
      from: apiEmail,
      to: userEmail,
      subject: "Будь ласка, підтвердіть Вашу електронну пошту",
      html: `
            <h1>Підтвердження електронної пошти</h1>
            <h2>Вітаємо, ${userFullName}!</h2>
            <p>Дякуємо, що обрали наш вебдодаток. Підтвердіть, будь ласка, Вашу електронну пошту перейшовши за посиланням:</p>
            <a href=http://localhost:3000/confirm/${confirmationCode}>${confirmationCode}</a>
        `,
    })
    .catch((e) => console.log(e));
};

module.exports = { sendConfirmationEmail };
