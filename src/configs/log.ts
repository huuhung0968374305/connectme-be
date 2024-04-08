import "dotenv/config";

export const logConfig = {
  logFolder: process.env.LOG_FOLDER,
  logFile: process.env.LOG_FILE,
  logLevel: process.env.LOG_LEVEL,
};
