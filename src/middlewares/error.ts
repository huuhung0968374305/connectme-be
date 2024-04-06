import { Request, Response, NextFunction } from "express";
import { logger } from "../configs/logger";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) next();
  const { message } = err;

  logger.error({ error: message });

  res.status(500).send("Internal server error");
};
