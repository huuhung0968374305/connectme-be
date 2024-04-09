"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Room extends sequelize_1.Model {
}
exports.Room = Room;
Room.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "DOUBLE",
    },
}, { sequelize: db_1.default, modelName: "Room" });
