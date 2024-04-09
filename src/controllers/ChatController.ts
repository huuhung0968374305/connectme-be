import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { logger } from "../configs/logger";
import { UserService } from "../services/User.service";
import { ChatService } from "../services/Chat.service";

export class ChatController {
  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getAllUsers();
      res.status(200).send({ result });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userIds } = req.body;
      const result = await this.chatService.createRoom(userIds);
      res.status(200).send({ result });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  createR = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const result = await this.chatService.createR(userId);
      res.status(200).send({ result });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };
}
