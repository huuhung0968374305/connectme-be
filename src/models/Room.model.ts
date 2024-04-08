import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { RoomAttributes } from "../interfaces/Room.interface";
import { User } from "./User.model";

export class Room extends Model<RoomAttributes> {
  declare id: string;

  declare password: string;

  declare username: string;
}
Room.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Room" },
);
