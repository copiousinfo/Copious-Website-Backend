import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Captures info, warn, and error
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    // 1. Keep your file logging (visible in File Manager)
    new winston.transports.File({ filename: "console.log", level: "info" }),
    new winston.transports.File({ filename: "strerror.log", level: "error" }),

    // 2. ADD THIS LINE: Sends logs to Hostinger's Runtime Log Panel
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});
export default logger;
