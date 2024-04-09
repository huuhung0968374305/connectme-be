"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChatRoom = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const Room_model_1 = require("./Room.model");
const User_model_1 = require("./User.model");
class UserChatRoom extends sequelize_1.Model {
}
exports.UserChatRoom = UserChatRoom;
UserChatRoom.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    RoomId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Room_model_1.Room,
            key: "id",
        },
    },
    UserId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_model_1.User,
            key: "id",
        },
    },
}, { sequelize: db_1.default, modelName: "UserChatRoom", timestamps: false });
