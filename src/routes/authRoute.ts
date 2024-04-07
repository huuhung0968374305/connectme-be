import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { userValidation } from "../middlewares/userValidation";
import { UserService } from "../services/User.service";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

const userService = new UserService();
const authController = new AuthController(userService);
// const userValidator = new UserValidator();

router.post("/signup", userValidation, authController.register);
router.post("/signin", userValidation, authController.login);
router.post("/do", authMiddleware, authController.do);

export default router;
