export interface UserChatRoomAttributes {
  id?: string;
  UserId: string; // Foreign key to User model
  RoomId: string; // Foreign key to Room model
}
