export default (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      date: DataTypes.DATE,  // change from DATEONLY to DATE,
      userId: DataTypes.INTEGER,
      seatId: DataTypes.INTEGER,
      timeSlotId: DataTypes.INTEGER,
      people: DataTypes.INTEGER,       // ADD THIS
      duration: DataTypes.INTEGER   // ADD THIS
        },
    {
      tableName: "bookings",
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.Seat, {
      foreignKey: "seatId",
    });

    Booking.belongsTo(models.TimeSlot, {
      foreignKey: "timeSlotId",
    });
  };

  return Booking;
};
