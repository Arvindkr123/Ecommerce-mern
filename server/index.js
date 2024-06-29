import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import { PORT } from "./config/config.js";
import path from "path";
dotenv.config();
const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extented: true }));

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
// app.use(express.static(path.join(__dirname, "./build")));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
