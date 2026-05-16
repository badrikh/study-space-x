import express from "express";
import { getAIAnalytics } from "../controllers/aiAnalyticsController.js";

const router = express.Router();

// Manual CORS headers
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

router.get("/", getAIAnalytics);

export default router;
