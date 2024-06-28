import UserModel from "../models/user.models.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";

export const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    user = {
      name,
      email,
      password: hashPassword,
    };

    const otp = Math.floor(Math.random() * 10000);
    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.ACTITVATION_SECRET
    );

    await sendMail(
      email,
      "Let's Negotiate",
      `Please Verify your Account using otp your otp is ${otp}`
    );

    res.status(200).json({
      message: "Otp send to your email",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
