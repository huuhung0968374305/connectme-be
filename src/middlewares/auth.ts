import express from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  username: string;
}

export const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log("authorizationHeader", authorizationHeader);

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    const decodedPayload = jwt.verify(token, secret) as JWTPayload;
    console.log("decodedPayload", decodedPayload);

    req.user = decodedPayload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
