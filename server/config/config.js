import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MONGODB_URI,
  ACTITVATION_SECRET,
  USER_EMAIL,
  USER_PASSWORD,
} = process.env;
