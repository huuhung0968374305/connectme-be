import { Request, Response, NextFunction } from "express";
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
      const data = await this.userService.getAllUsers();
      res.status(200).send({ data });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  getAllUserRooms = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    try {
      const data = await this.userService.getAllUserRooms(id);
      res.status(200).send({ data });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userIds } = req.body;
      const data = await this.chatService.createRoom(userIds);
      res.status(200).send({ data });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  findMsgs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roomId } = req.query;
      const data = await this.chatService.findMsgs(roomId);
      res.status(200).send({ data });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };
}
