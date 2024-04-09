"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../configs/logger");
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    if (!err)
        next();
    const { message } = err;
    logger_1.logger.error({ error: message });
    res.status(500).send("Internal server error");
};
exports.errorHandler = errorHandler;
