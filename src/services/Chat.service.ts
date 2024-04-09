import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Room } from "../models/Room.model";

import sequelize from "../db";
import { UserChatRoom } from "../models/UserChatRoom.model";

export class ChatService {
  async createRoom(userIds: Array<string>) {
    const [userId1, userId2] = userIds;
    const transaction = await sequelize.transaction();
    try {
      const {
        dataValues: { id: newRoomId },
      } = await Room.create();
      if (newRoomId) {
        const createdRoomRes1 = await UserChatRoom.create(
          { RoomId: newRoomId, UserId: userId1 },
          { transaction },
        );
        const createdRoomRes2 = await UserChatRoom.create(
          { RoomId: newRoomId, UserId: userId2 },
          { transaction },
        );

        await transaction.commit();

        return [createdRoomRes1, createdRoomRes2];
      }
      transaction.rollback();
      return [];
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
