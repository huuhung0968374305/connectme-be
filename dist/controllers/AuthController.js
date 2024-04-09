"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const logger_1 = require("../configs/logger");
const userValidation_1 = require("../middlewares/userValidation");
const validation_helper_1 = require("../helpers/validation.helper");
class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.register = async (req, res, next) => {
            const { email, username, password } = req.body;
            const validate = (0, express_validator_1.validationResult)(req);
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
            }
            catch (e) {
                logger_1.logger.error(e);
                next(e);
            }
        };
        this.login = async (req, res, next) => {
            const { email, password } = req.body;
            const validate = (0, express_validator_1.validationResult)(req);
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
                delete result.password;
                return res.status(200).send({ status: "true", data: result });
            }
            catch (e) {
                logger_1.logger.error(e);
                next(e);
            }
        };
        this.do = async (req, res) => {
            const result = validation_helper_1.ValidationHelper.reformatError(await userValidation_1.signUpValidation.run(req));
            return res.status(200).send(result);
        };
    }
}
exports.default = AuthController;
