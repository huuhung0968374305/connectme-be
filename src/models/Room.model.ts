import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { RoomAttributes } from "../interfaces/Room.interface";
import { User } from "./User.model";

export class Room extends Model<RoomAttributes> {
  declare id: string;

  declare userId: string;
}
Room.init(
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
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DOUBLE",
    },
  },
  { sequelize, modelName: "Room" },
);
