const express = require("express");

const app = express();

app.use(express.json());

const bookingRoutes = require("./routes/bookingRoutes");

app.use("/bookings", bookingRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});