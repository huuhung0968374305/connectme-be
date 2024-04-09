"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const User_model_1 = require("./User.model");
const Room_model_1 = require("./Room.model");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
Message.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    UserId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_model_1.User,
            key: "id",
        },
    },
    RoomId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Room_model_1.Room,
            key: "id",
        },
    },
    msgType: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "text",
    },
    msg: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: db_1.default, modelName: "Message" });
