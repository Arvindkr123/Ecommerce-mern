import { Router } from "express";
import isAuthenticated from "../middleware/isAuth.middleware.js";
import { uploadFiles } from "../middleware/multer.js";
import { createProduct } from "../controllers/product.controllers.js";

const router = Router();

// create a product
router.post("/product/new", isAuthenticated, uploadFiles, createProduct);
export default router;
