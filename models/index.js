const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.sequelize = sequelize;
db.Sequelize = require("sequelize");

db.Menu = require("./menu")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.Seat = require("./seat")(sequelize, DataTypes);
db.TimeSlot = require("./time.slot")(sequelize, DataTypes);
db.Booking = require("./booking")(sequelize, DataTypes);
db.Payment = require("./payment");

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
