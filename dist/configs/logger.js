"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const log_1 = require("./log");
const enumerateErrorFormat = winston_1.default.format((info) => {
    if (info.message instanceof Error) {
        // eslint-disable-next-line no-param-reassign
        info.message = {
            message: info.message.message,
            stack: info.message.stack,
            ...info.message,
        };
    }
    if (info instanceof Error) {
        return {
            // message: info.message,
            stack: info.stack,
            ...info,
        };
    }
    return info;
});
const transport = new winston_daily_rotate_file_1.default({
    filename: (log_1.logConfig.logFolder || "logs") + (log_1.logConfig.logFile || "logDetail"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "3",
    // prepend: true,
});
exports.logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(enumerateErrorFormat(), winston_1.default.format.json()),
    transports: [
        transport,
        new winston_1.default.transports.Console({
            level: "info",
        }),
    ],
});
