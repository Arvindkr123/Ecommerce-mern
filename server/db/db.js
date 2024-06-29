import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config.js";
export const connectDB = async () => {
  try {
    const res = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully", res.connection.host);
  } catch (error) {
    console.log(error);
  }
};
