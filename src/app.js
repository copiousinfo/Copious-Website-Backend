import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./utils/logger.utils.js";
import contactRoutes from "./routes/contact.route.js";
import healthRoutes from "./routes/healthcheck.route.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS should be one of the first middlewares — before body parsers/routes
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/usercreate", contactRoutes);

// serve react build
app.use(express.static(path.join(__dirname, "../public")));

// Health check
// app.get("/", (req, res) => {
//   res.status(200).json({ success: true, message: "API is running" });
// });

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
