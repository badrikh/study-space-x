import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import menuModel from "./menu.js";
import userModel from "./user.js";
import seatModel from "./seat.js";
import timeSlotModel from "./timeslot.js";
import bookingModel from "./booking.js";
import paymentModel from "./payment.js";
import orderModel from "./order.js";
import adminModel from "./admin.js";
import categoryModel from "./category.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Menu = menuModel(sequelize, DataTypes);
db.User = userModel(sequelize, DataTypes);
db.Seat = seatModel(sequelize, DataTypes);
db.TimeSlot = timeSlotModel(sequelize, DataTypes);
db.Booking = bookingModel(sequelize, DataTypes);
db.Payment = paymentModel(sequelize, DataTypes);
db.Order = orderModel(sequelize, DataTypes);
db.Admin = adminModel(sequelize, DataTypes);
db.Category = categoryModel(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
