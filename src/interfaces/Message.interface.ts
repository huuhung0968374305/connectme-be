export interface MessageAttributes {
  id: number;
  UserId: number; // Foreign key to User model
  RoomId: number; // Foreign key to Room model
  msgType: string;
  msg: string;
}
