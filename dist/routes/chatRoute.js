"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_service_1 = require("../services/User.service");
const ChatController_1 = require("../controllers/ChatController");
const Chat_service_1 = require("../services/Chat.service");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
const userService = new User_service_1.UserService();
const chatService = new Chat_service_1.ChatService();
const chatController = new ChatController_1.ChatController(userService, chatService);
router.get("/chat/getAllUsers", chatController.getAllUsers);
router.get("/chat/getAllUserRooms", auth_1.authMiddleware, chatController.getAllUserRooms);
router.post("/chat/createRoom", chatController.createRoom);
router.get("/chat/findMsgs", chatController.findMsgs);
exports.default = router;
