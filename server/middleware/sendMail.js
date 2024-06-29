import { createTransport } from "nodemailer";
import { USER_EMAIL, USER_PASSWORD } from "../config/config.js";

const sendMail = async (email, subject, text) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  });

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    text,
  });
};

export default sendMail;
