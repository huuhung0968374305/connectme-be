import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Room } from "../models/Room.model";

import sequelize from "../db";
import { v4 } from "uuid";

export class ChatService {
  async createRoom(userIds: Array<string>) {
    const [userId1, userId2] = userIds;
    const roomId = v4();
    const transaction = await sequelize.transaction();
    try {
      const room1 = await Room.create(
        { roomId, UserId: userId1 },
        { transaction },
      );
      const room2 = await Room.create(
        { roomId, UserId: userId2 },
        { transaction },
      );

      await transaction.commit();

      return [room1, room2];
    } catch (error) {
      console.log("error", error);
      await transaction.rollback();
      throw error;
    }
  }
  async createR(userId) {
    // const room2 = await Room.create({ UserId: userId });
    return;
    // return room2;
  }
}
