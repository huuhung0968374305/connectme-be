"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const sequelize_1 = require("sequelize");
const Room_model_1 = require("../models/Room.model");
const db_1 = __importDefault(require("../db"));
const UserChatRoom_model_1 = require("../models/UserChatRoom.model");
const Message_model_1 = require("../models/Message.model");
class ChatService {
    async createRoom(userIds) {
        const [userId1, userId2] = userIds;
        // found chat room first, if there is no chat room, create one
        const user1Res = await UserChatRoom_model_1.UserChatRoom.findAll({
            where: {
                UserId: userId1,
            },
        });
        const user1ChatRooms = user1Res.map((response) => response.RoomId);
        const user2FoundRoomWithUser1 = await UserChatRoom_model_1.UserChatRoom.findAll({
            where: {
                UserId: userId2,
                RoomId: {
                    [sequelize_1.Op.in]: user1ChatRooms,
                },
            },
        });
        if (user2FoundRoomWithUser1.length > 0)
            return user2FoundRoomWithUser1;
        const transaction = await db_1.default.transaction();
        try {
            const { dataValues: { id: newRoomId }, } = await Room_model_1.Room.create();
            if (newRoomId) {
                const createdRoomRes1 = await UserChatRoom_model_1.UserChatRoom.create({ RoomId: newRoomId, UserId: userId1 }, { transaction });
                const createdRoomRes2 = await UserChatRoom_model_1.UserChatRoom.create({ RoomId: newRoomId, UserId: userId2 }, { transaction });
                await transaction.commit();
                return [createdRoomRes1, createdRoomRes2];
            }
            transaction.rollback();
            return [];
        }
        catch (error) {
            console.log("error", error);
            await transaction.rollback();
            throw error;
        }
    }
    async findMsgs(roomId) {
        const messages = await Message_model_1.Message.findAll({
            where: {
                RoomId: roomId,
            },
        });
        return messages;
    }
}
exports.ChatService = ChatService;
