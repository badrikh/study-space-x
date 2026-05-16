export default (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        "Booking",
        {
            date: DataTypes.DATEONLY,
            userId: DataTypes.INTEGER,
            seatId: DataTypes.INTEGER,
            timeSlotId: DataTypes.INTEGER,
            status: DataTypes.STRING,
        },
        { tableName: "bookings" }
    );

    Booking.associate = (models) => {
        Booking.belongsTo(models.User, { foreignKey: "userId" });
        Booking.belongsTo(models.Seat, { foreignKey: "seatId" });
        Booking.belongsTo(models.TimeSlot, { foreignKey: "timeSlotId" });
        Booking.hasMany(models.Order, { foreignKey: "booking_id" });
        Booking.hasOne(models.Payment, { foreignKey: "bookingId" });
    };

    return Booking;
};
