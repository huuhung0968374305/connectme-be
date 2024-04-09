"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIpValidation = exports.signUpValidation = void 0;
const express_validator_1 = require("express-validator");
exports.signUpValidation = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        isEmail: {
            errorMessage: "Invalid email",
        },
    },
    username: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Username cannot be empty",
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: "Username must be between 5 and 20 characters",
        },
    },
    password: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Password cannot be empty",
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: "Password must be between 5 and 20 characters",
        },
    },
});
exports.signIpValidation = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        isEmail: {
            errorMessage: "Invalid email",
        },
    },
    password: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Password cannot be empty",
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: "Password must be between 5 and 20 characters",
        },
    },
});
