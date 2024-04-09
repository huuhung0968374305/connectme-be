"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./configs/logger");
const db_1 = __importDefault(require("./db"));
require("./models/associations");
const PORT = process.env.PORT || 80;
(async () => {
    try {
        await db_1.default.sync({}); // Set force: true to drop and recreate tables (use with caution!)
        logger_1.logger.info("Database tables resynced");
        app_1.server.listen(PORT, () => {
            logger_1.logger.info(`Listening on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.logger.error("Error initializing server:", error);
    }
})();
