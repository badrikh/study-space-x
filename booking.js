'use strict';

module.exports = (sequelize, DataTypes) => {

  const Booking = sequelize.define('Booking', {

    date: DataTypes.DATEONLY,

    userId: DataTypes.INTEGER,

    seatId: DataTypes.INTEGER,

    timeSlotId: DataTypes.INTEGER

  }, {

    tableName: 'bookings'

  });

  Booking.associate = function(models){

    Booking.belongsTo(models.Seat, {
      foreignKey: 'seatId'
    });

    Booking.belongsTo(models.TimeSlot, {
      foreignKey: 'timeSlotId'
    });

  };

  return Booking;

};