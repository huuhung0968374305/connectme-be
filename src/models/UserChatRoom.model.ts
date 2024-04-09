import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { UserChatRoomAttributes } from "../interfaces/UserChatRoom.interface";
import { Room } from "./Room.model";
import { User } from "./User.model";

export class UserChatRoom extends Model<UserChatRoomAttributes> {
  declare id: string;

  declare UserId: string;

  declare RoomId: string;
}
UserChatRoom.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    RoomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Room,
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "UserChatRoom", timestamps: false },
);
