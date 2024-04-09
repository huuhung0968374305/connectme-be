import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

import { UserAttributes } from "../interfaces/User.interface";
import { User } from "../models/User.model";
import { UserChatRoom } from "../models/UserChatRoom.model";

export class UserService {
  async register(user: UserAttributes): Promise<any> {
    const { email } = user;
    const userExisted = await User.findOne({
      where: { email },
    });
    if (userExisted) {
      return { userExisted: true };
    }
    const hashedPassword = (await bcrypt.hash(
      user.password,
      10,
    )) as unknown as string;
    user.imageUrl = faker.image.url();
    const newUser = await User.create({ ...user, password: hashedPassword });
    return newUser;
  }

  async getAllUsers(): Promise<any> {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return users;
  }

  async getAllUserRooms(userId: string): Promise<any> {
    const rooms = await UserChatRoom.findAll({
      where: {
        UserId: userId,
      },
    });
    return rooms;
  }

  async login({ email, password }: UserAttributes) {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return { error: "User not found" };
    }
    const userAllowed = await bcrypt.compare(password, user.password);

    if (userAllowed) {
      const payload = {
        email: user.email,
        id: user.id,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return { accessToken, ...user.dataValues };
    }
    return { error: "Incorrect password" };
  }
}
