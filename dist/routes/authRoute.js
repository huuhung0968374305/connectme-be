"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const userValidation_1 = require("../middlewares/userValidation");
const User_service_1 = require("../services/User.service");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const userService = new User_service_1.UserService();
const authController = new AuthController_1.default(userService);
router.post("/signup", userValidation_1.signUpValidation, authController.register);
router.post("/signin", userValidation_1.signIpValidation, authController.login);
router.post("/do", auth_1.authMiddleware, authController.do);
exports.default = router;
