import UserModel from "../models/user.models.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import { ACTITVATION_SECRET } from "../config/config.js";

export const userRegisterController = async (req, res) => {
  //console.log(req.body);
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });

    if (user) {
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
      ACTITVATION_SECRET,
      {
        expiresIn: "5m",
      }
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

export const userVerifyWithHelpOfOtpController = async (req, res) => {
  const { otp, activationToken } = req.body;
  try {
    const decodedData = jwt.verify(activationToken, ACTITVATION_SECRET);
    if (!decodedData.user) {
      return res.status(400).json({ message: "Invalid activation token" });
    }

    if (decodedData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await UserModel.create({
      name: decodedData.user.name,
      email: decodedData.user.email,
      password: decodedData.user.password,
    });

    res.status(200).json({
      message: `user registered successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Please login first" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const matchPassword = await bcryptjs.compare(password, user.password);
    console.log(matchPassword);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, ACTITVATION_SECRET, {
      expiresIn: "15d",
    });

    res.json({
      message: `welcome back ${user.name}`,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
