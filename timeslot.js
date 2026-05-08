'use strict';

module.exports = (sequelize, DataTypes) => {

  const TimeSlot = sequelize.define('TimeSlot', {

    startTime: DataTypes.STRING,

    endTime: DataTypes.STRING

  }, {

    tableName: 'timeslots'

  });

  TimeSlot.associate = function(models){

    TimeSlot.hasMany(models.Booking, {
      foreignKey: 'timeSlotId'
    });

  };

  return TimeSlot;

};