"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log("authorizationHeader", authorizationHeader);
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authorizationHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        const decodedPayload = jsonwebtoken_1.default.verify(token, secret);
        console.log("decodedPayload", decodedPayload);
        req.user = decodedPayload;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
