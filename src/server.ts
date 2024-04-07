import app from "./app";
import { logger } from "./configs/logger";
// import sequelize from "./db";

const PORT = process.env.PORT || 80;

(async () => {
  try {
    // await sequelize.sync({ force: true }); // Set force: true to drop and recreate tables (use with caution!)

    logger.info("Database tables resynced");

    app.listen(PORT, () => {
      logger.info(`Listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Error initializing server:", error);
  }
})();
