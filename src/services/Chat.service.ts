import { Op } from "sequelize";
import { Room } from "../models/Room.model";

import sequelize from "../db";
import { UserChatRoom } from "../models/UserChatRoom.model";
import { Message } from "../models/Message.model";

export class ChatService {
  async createRoom(userIds: Array<string>) {
    const [userId1, userId2] = userIds;
    // found chat room first, if there is no chat room, create one

    const user1Res = await UserChatRoom.findAll({
      where: {
        UserId: userId1,
      },
    });

    const user1ChatRooms = user1Res.map((response) => response.RoomId);
    const user2FoundRoomWithUser1 = await UserChatRoom.findAll({
      where: {
        UserId: userId2,
        RoomId: {
          [Op.in]: user1ChatRooms,
        },
      },
    });

    if (user2FoundRoomWithUser1.length > 0) return user2FoundRoomWithUser1;

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

  async findMsgs(roomId) {
    const messages = await Message.findAll({
      where: {
        RoomId: roomId,
      },
    });
    return messages;
  }
}
