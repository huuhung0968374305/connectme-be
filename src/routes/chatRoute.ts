import { Router } from "express";
import { UserService } from "../services/User.service";
import { ChatController } from "../controllers/ChatController";
import { ChatService } from "../services/Chat.service";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

const userService = new UserService();
const chatService = new ChatService();
const chatController = new ChatController(userService, chatService);

router.get("/chat/getAllUsers", chatController.getAllUsers);
router.get(
  "/chat/getAllUserRooms",
  authMiddleware,
  chatController.getAllUserRooms,
);
router.post("/chat/createRoom", chatController.createRoom);
router.get("/chat/findMsgs", chatController.findMsgs);

export default router;
