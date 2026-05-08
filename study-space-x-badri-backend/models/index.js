const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.sequelize = sequelize;
db.Sequelize = require("sequelize").Sequelize;

db.Menu = require("./menu")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.Seat = require("./seat")(sequelize, DataTypes);
db.TimeSlot = require("./timeslot")(sequelize, DataTypes);
db.Booking = require("./booking")(sequelize, DataTypes);
db.Payment = require("./payment");
db.Order = require("./order")(sequelize, DataTypes);

// Associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;