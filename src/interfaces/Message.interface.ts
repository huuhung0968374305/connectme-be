export interface MessageAttributes {
  id: number;
  userId: number; // Foreign key to User model
  roomId: number; // Foreign key to Room model
  msgType: string;
  msg: string;
}
