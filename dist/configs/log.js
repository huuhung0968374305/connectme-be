"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logConfig = void 0;
require("dotenv/config");
exports.logConfig = {
    logFolder: process.env.LOG_FOLDER,
    logFile: process.env.LOG_FILE,
    logLevel: process.env.LOG_LEVEL,
};
