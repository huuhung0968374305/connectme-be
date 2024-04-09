import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { RoomAttributes } from "../interfaces/Room.interface";

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

    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DOUBLE",
    },
  },
  { sequelize, modelName: "Room" },
);
