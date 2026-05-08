const express = require("express");
const sequelize = require("./config/database");

const app = express();

const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const seatRoutes = require("./routes/seatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const timeSlotRoutes = require("./routes/timeSlotRoutes");

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/menus", menuRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use("/seats", seatRoutes);
app.use("/bookings", bookingRoutes);
app.use("/timeslots", timeSlotRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("MySQL connected with Sequelize");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.log("Failed to connect to database:", error.message);
  }
}

startServer();