"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const error_1 = require("./middlewares/error");
const rootSocket_1 = require("./configs/rootSocket");
// Create the express app and  import the type of app from express;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
});
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.server = http_1.default.createServer(app);
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: "*",
    },
});
(0, rootSocket_1.sockerHanler)(io);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.get("/", (_req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});
app.use("/api/v1", routes_1.default);
app.use(error_1.errorHandler);
app.get("*", (_req, res) => {
    res.status(404).send("Not Found");
});
exports.default = app;
