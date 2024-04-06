import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import routes from "./routes";
import { errorHandler } from "./middlewares/error";

// Create the express app and  import the type of app from express;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
dotenv.config();
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(limiter);
app.get("/", (_req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});
app.use("/api/v1", routes);
app.get("*", (_req, res) => {
  res.status(404).send("Not Found");
});
app.use(errorHandler);

export default app;
