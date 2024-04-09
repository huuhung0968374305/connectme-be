"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const faker_1 = require("@faker-js/faker");
const User_model_1 = require("../models/User.model");
const UserChatRoom_model_1 = require("../models/UserChatRoom.model");
class UserService {
    async register(user) {
        const { email } = user;
        const userExisted = await User_model_1.User.findOne({
            where: { email },
        });
        if (userExisted) {
            return { userExisted: true };
        }
        const hashedPassword = (await bcrypt_1.default.hash(user.password, 10));
        user.imageUrl = faker_1.faker.image.url();
        const newUser = await User_model_1.User.create({ ...user, password: hashedPassword });
        return newUser;
    }
    async getAllUsers() {
        const users = await User_model_1.User.findAll({
            attributes: {
                exclude: ["password"],
            },
        });
        return users;
    }
    async getAllUserRooms(userId) {
        const rooms = await UserChatRoom_model_1.UserChatRoom.findAll({
            where: {
                UserId: userId,
            },
        });
        return rooms;
    }
    async login({ email, password }) {
        const user = await User_model_1.User.findOne({
            where: { email },
        });
        if (!user) {
            return { error: "User not found" };
        }
        const userAllowed = await bcrypt_1.default.compare(password, user.password);
        if (userAllowed) {
            const payload = {
                email: user.email,
                id: user.id,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            return { accessToken, ...user.dataValues };
        }
        return { error: "Incorrect password" };
    }
}
exports.UserService = UserService;
