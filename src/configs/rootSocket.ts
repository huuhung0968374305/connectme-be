import socketIo from "socket.io";

export const sockerHanler = (io: socketIo.Server) => {
  io.on("connection", async (socket) => {
    console.log("socket.id", socket.id);
    socket.on("join-room", async ({ room, userId }) => {
      console.log("join new room", room);
      await socket.join(room);
    });

    socket.on("send-message", ({ message, room }) => {
      socket.to(room).emit("new-message", { message }); // Include sender information
    });

    socket.on("disconnect", () => {
      console.log(socket.rooms.size);
    });
  });
};
