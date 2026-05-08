'use strict';

module.exports = (sequelize, DataTypes) => {

  const TimeSlot = sequelize.define('TimeSlot', {

    time: DataTypes.STRING,

    status: DataTypes.STRING

  }, {

    tableName: 'TimeSlots'

  });

  TimeSlot.associate = function(models){

    TimeSlot.hasMany(models.Booking, {
      foreignKey: 'timeSlotId'
    });

  };

  return TimeSlot;

};