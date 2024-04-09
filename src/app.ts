import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import http from "http";

import routes from "./routes";
import { errorHandler } from "./middlewares/error";
import { sockerHanler } from "./configs/rootSocket";

// Create the express app and  import the type of app from express;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
dotenv.config();
const app: Application = express();
export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
sockerHanler(io);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.get("/", (_req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});
app.use("/api/v1", routes);
app.use(errorHandler);
app.get("*", (_req, res) => {
  res.status(404).send("Not Found");
});

export default app;
