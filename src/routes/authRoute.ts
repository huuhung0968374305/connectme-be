import { Router } from "express";
import AuthController from "../controllers/AuthController";
import {
  signIpValidation,
  signUpValidation,
} from "../middlewares/userValidation";
import { UserService } from "../services/User.service";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

router.post("/signup", signUpValidation, authController.register);
router.post("/signin", signIpValidation, authController.login);
router.post("/do", authMiddleware, authController.do);

export default router;
