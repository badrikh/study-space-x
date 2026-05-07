'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Booking extends Model {

    static associate(models) {

      Booking.belongsTo(models.Seat, {
        foreignKey: "seatId"
      });

      Booking.belongsTo(models.TimeSlot, {
        foreignKey: "timeSlotId"
      });

    }

  }

  Booking.init({

    date: DataTypes.DATE,

    people: DataTypes.INTEGER,

    seatId: DataTypes.INTEGER,

    timeSlotId: DataTypes.INTEGER

  }, {

    sequelize,
    modelName: 'Booking',

  });

  return Booking;

};