"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("./User.model");
const Room_model_1 = require("./Room.model");
const Message_model_1 = require("./Message.model");
const UserChatRoom_model_1 = require("./UserChatRoom.model");
User_model_1.User.belongsToMany(Room_model_1.Room, { through: UserChatRoom_model_1.UserChatRoom }); // Use 'UserChatRooms' if defined
Room_model_1.Room.belongsToMany(User_model_1.User, { through: UserChatRoom_model_1.UserChatRoom }); // Use 'UserChatRooms' if defined
Message_model_1.Message.belongsTo(User_model_1.User);
Message_model_1.Message.belongsTo(Room_model_1.Room);
Room_model_1.Room.hasMany(Message_model_1.Message);
