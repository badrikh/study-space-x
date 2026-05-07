'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TimeSlot.hasMany(models.Booking, {
      foreignKey: "timeSlotId"
      });
    }
  }
  TimeSlot.init({
    time: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TimeSlot',
  });
  return TimeSlot;
};