import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { UserAttributes } from "../interfaces/User.interface";

export class User extends Model<UserAttributes> {
  declare id: string;

  declare password: string;

  declare username: string;
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "User" },
);
