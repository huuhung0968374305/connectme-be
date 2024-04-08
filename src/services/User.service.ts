import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserAttributes } from "../interfaces/User.interface";
import { User } from "../models/User.model";

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

    const newUser = await User.create({ ...user, password: hashedPassword });
    return newUser;
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
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return { accessToken, id: user.id };
    }
    return { error: "Incorrect password" };
  }
}
