import { Sequelize } from "sequelize";
import { dbConfig } from "../configs/database";
import { logger } from "../configs/logger";

const sequelize = new Sequelize(dbConfig);

(async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection to PostgreSQL database established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

export default sequelize;
