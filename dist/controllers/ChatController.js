"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const logger_1 = require("../configs/logger");
class ChatController {
    constructor(userService, chatService) {
        this.userService = userService;
        this.chatService = chatService;
        this.getAllUsers = async (req, res, next) => {
            try {
                const data = await this.userService.getAllUsers();
                res.status(200).send({ data });
            }
            catch (e) {
                logger_1.logger.error(e);
                next(e);
            }
        };
        this.getAllUserRooms = async (req, res, next) => {
            const { id } = req.user;
            try {
                const data = await this.userService.getAllUserRooms(id);
                res.status(200).send({ data });
            }
            catch (e) {
                logger_1.logger.error(e);
                next(e);
            }
        };
        this.createRoom = async (req, res, next) => {
            try {
                const { userIds } = req.body;
                const data = await this.chatService.createRoom(userIds);
                res.status(200).send({ data });
            }
            catch (e) {
                logger_1.logger.error(e);
                next(e);
            }
        };
        this.findMsgs = async (req, res, next) => {
            try {
                const { roomId } = req.query;
                const data = await this.chatService.findMsgs(roomId);
                res.status(200).send({ data });
            }
            catch (e) {
                logger_1.logger.error(e);
                next(e);
            }
        };
    }
}
exports.ChatController = ChatController;
