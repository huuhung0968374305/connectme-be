import { Router } from "express";
import { UserService } from "../services/User.service";
import { authMiddleware } from "../middlewares/auth";
import { ChatController } from "../controllers/ChatController";
import { ChatService } from "../services/Chat.service";

const router = Router();

const userService = new UserService();
const chatService = new ChatService();
const chatController = new ChatController(userService, chatService);

router.get("/chat/getAllUsers", authMiddleware, chatController.getAllUsers);
router.post("/chat/createRoom", chatController.createRoom);
router.post("/chat/createR", chatController.createR);

export default router;
