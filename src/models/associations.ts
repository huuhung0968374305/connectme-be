import { User } from "./User.model";
import { Room } from "./Room.model";
import { Message } from "./Message.model";

Room.belongsTo(User);
User.hasMany(Room);

Message.belongsTo(User);
Message.belongsTo(Room);
Room.hasMany(Message);
