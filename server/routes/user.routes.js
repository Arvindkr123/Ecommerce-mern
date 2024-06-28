import { Router } from "express";
import { userRegisterController } from "../controllers/users.controllers.js";

const router = Router();

router.post("/user/register", userRegisterController);

export default router;
