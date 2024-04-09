import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { MessageAttributes } from "../interfaces/Message.interface";
import { User } from "./User.model";
import { Room } from "./Room.model";

export class Message extends Model<MessageAttributes> {
  declare id: string;

  declare userId: string;

  declare roomId: string;
}
Message.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    RoomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Room,
        key: "id",
      },
    },
    msgType: {
      type: DataTypes.STRING,
      defaultValue: "text",
    },
    msg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Message" },
);
