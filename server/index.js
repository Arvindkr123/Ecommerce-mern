import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extented: true }));

const PORT = process.env.PORT;

app.use("/api", userRoutes);

connectDB()
  .then(() => {
    app.listen(4040, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
