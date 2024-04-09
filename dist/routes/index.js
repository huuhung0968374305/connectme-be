"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const chatRoute_1 = __importDefault(require("./chatRoute"));
const routes = [authRoute_1.default, chatRoute_1.default];
exports.default = routes;
