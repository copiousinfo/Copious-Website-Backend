import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/connectDB.js";
import logger from "./utils/logger.utils.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
