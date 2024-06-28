import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully", res.connection.host);
  } catch (error) {
    console.log(error);
  }
};
