import { server } from "./app";
import { logger } from "./configs/logger";
import sequelize from "./db";
import "./models/associations";

const PORT = process.env.PORT || 80;

(async () => {
  try {
    await sequelize.sync({}); // Set force: true to drop and recreate tables (use with caution!)

    logger.info("Database tables resynced");

    server.listen(PORT, () => {
      logger.info(`Listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Error initializing server:", error);
  }
})();
