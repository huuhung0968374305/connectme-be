import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { logger } from "../configs/logger";
import { UserService } from "../services/User.service";
import { signUpValidation } from "../middlewares/userValidation";
import { ValidationHelper } from "../helpers/validation.helper";

export default class AuthController {
  constructor(private readonly userService: UserService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;
    const validate: any = validationResult(req);
    if (validate.errors?.length > 0) {
      return res.status(400).send({ errors: validate.errors });
    }

    try {
      const result = await this.userService.register({
        email,
        password,
        username,
      });
      if (result.userExisted) {
        res.status(400).send({ error: "User existed" });
      }
      res.status(201).send();
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const validate: any = validationResult(req);
    if (validate.errors?.length > 0) {
      return res.status(400).send({ errors: validate.errors });
    }
    try {
      const result = await this.userService.login({
        email,
        password,
      });
      if (result.error) {
        return res.status(400).send({ error: result.error });
      }
      delete (result as any).password;
      return res.status(200).send({ status: "true", data: result });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };

  do = async (req: Request, res: Response) => {
    const result = ValidationHelper.reformatError(
      await signUpValidation.run(req),
    );

    return res.status(200).send(result);
  };
}
