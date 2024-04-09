"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const logger_1 = require("../configs/logger");
const sequelize = new sequelize_1.Sequelize(database_1.dbConfig);
(async () => {
    try {
        await sequelize.authenticate();
        logger_1.logger.info("Connection to PostgreSQL database established successfully.");
    }
    catch (error) {
        logger_1.logger.error("Unable to connect to the database:", error);
        process.exit(1);
    }
})();
exports.default = sequelize;
