import jwt from "jsonwebtoken";
import { ACTITVATION_SECRET } from "../config/config.js";
import UserModel from "../models/user.models.js";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const decodedData = jwt.verify(token, ACTITVATION_SECRET);
    req.user = await UserModel.findById(decodedData.id);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default isAuthenticated;
