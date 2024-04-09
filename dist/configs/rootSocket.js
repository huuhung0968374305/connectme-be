"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockerHanler = void 0;
const crypto_helper_1 = require("../helpers/crypto.helper");
const Message_model_1 = require("../models/Message.model");
const sockerHanler = (io) => {
    io.on("connection", (socket) => {
        console.log("socket.id", socket.id);
        socket.on("join-room", async (roomId) => {
            socket.join(roomId);
        });
        socket.on("create-msg", async (data) => {
            const msgData = crypto_helper_1.CryptoHelper.decryptMsg(data);
            await Message_model_1.Message.create(msgData);
            socket.in(msgData.RoomId).emit("room-new-message", data);
        });
        socket.on("disconnect", () => { });
    });
};
exports.sockerHanler = sockerHanler;
