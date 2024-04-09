export interface RoomAttributes {
  id?: string;
  UserId: string; // Foreign key to User model
  type?: string;
  roomId: string;
}
