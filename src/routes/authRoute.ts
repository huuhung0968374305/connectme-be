import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

const authController = new AuthController();
// const userValidator = new UserValidator();

router.get(
  "/login",
  //   userValidator.userCreateValidator,
  authController.register,
);

// router.post("/login", userValidator.userLoginValidator, authController.login);
// router.post("/refresh-token", authController.refreshTokens);
// router.post("/logout", authController.logout);

export default router;
