import socketIo from "socket.io";
import { CryptoHelper } from "../helpers/crypto.helper";
import { MessageAttributes } from "../interfaces/Message.interface";
import { Message } from "../models/Message.model";

export const sockerHanler = (io: socketIo.Server) => {
  io.on("connection", (socket) => {
    console.log("socket.id", socket.id);
    socket.on("join-room", async (roomId) => {
      socket.join(roomId);
    });

    socket.on("create-msg", async (data: any) => {
      const msgData: MessageAttributes = CryptoHelper.decryptMsg(data);
      await Message.create(msgData);
      socket.in(msgData.RoomId).emit("room-new-message", data);
    });

    socket.on("disconnect", () => {});
  });
};
