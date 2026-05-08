'use strict';

module.exports = (sequelize, DataTypes) => {

  const Seat = sequelize.define('Seat', {

    seatNumber: DataTypes.STRING

  }, {

    tableName: 'seats'

  });

  Seat.associate = function(models){

    Seat.hasMany(models.Booking, {
      foreignKey: 'seatId'
    });

  };

  return Seat;

};