import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserAttributes } from "../interfaces/User.interface";
import { User } from "../models/User.model";

export class UserService {
  async register(user: UserAttributes): Promise<any> {
    const { username } = user;
    const userExisted = await User.findOne({
      where: { username },
    });
    if (userExisted) {
      return { userExisted: true };
    }
    const hashedPassword = (await bcrypt.hash(
      user.password,
      10,
    )) as unknown as string;

    const newUser = await User.create({ ...user, password: hashedPassword });
    return newUser;
  }

  async login({ username, password }: UserAttributes) {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return null;
    }
    const userAllowed = await bcrypt.compare(password, user.password);

    if (userAllowed) {
      const payload = {
        username: user.username,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return accessToken;
    }
  }
}
