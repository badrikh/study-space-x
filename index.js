import express from "express";
import cors from "cors";
import "./config/env.js";
import sequelize from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();
// routes
import menuRoutes from "./routes/menuRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import timeSlotRoutes from "./routes/timeSlotRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiAnalyticsRoutes from "./routes/aiAnalysticsRouter.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

const port = 3000;

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/menus", menuRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use("/seats", seatRoutes);
app.use("/bookings", bookingRoutes);
app.use("/timeslots", timeSlotRoutes);
app.use("/orders", orderRoutes);
app.use("/ai-analytics", aiAnalyticsRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// start server
async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("MySQL connected with Sequelize");

    app.listen(port, () => {
      console.log(
        `Server running at http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(
      "Failed to connect to database:",
      error.message
    );
  }
}

startServer();
