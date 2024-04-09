export interface MessageAttributes {
  id: number;
  UserId: string; // Foreign key to User model
  RoomId: string; // Foreign key to Room model
  msgType: string;
  msg: string;
}
