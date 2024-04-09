import { User } from "./User.model";
import { Room } from "./Room.model";
import { Message } from "./Message.model";
import { UserChatRoom } from "./UserChatRoom.model";

User.belongsToMany(Room, { through: UserChatRoom }); // Use 'UserChatRooms' if defined
Room.belongsToMany(User, { through: UserChatRoom }); // Use 'UserChatRooms' if defined

Message.belongsTo(User);
Message.belongsTo(Room);
Room.hasMany(Message);
