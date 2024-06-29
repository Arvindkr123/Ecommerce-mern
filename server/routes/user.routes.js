import { Router } from "express";
import {
  userRegisterController,
  userVerifyWithHelpOfOtpController,
  getUserProfileController,
  loginUserController,
} from "../controllers/users.controllers.js";
import isAuthenticated from "../middleware/isAuth.middleware.js";

const router = Router();

router.post("/user/register", userRegisterController);
router.post("/user/verifyUser", userVerifyWithHelpOfOtpController);
router.post("/user/login", loginUserController);
router.get("/user/profile", isAuthenticated, getUserProfileController);

export default router;
