export default (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        "Booking",
        {
            date: DataTypes.DATEONLY,
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
            seatId: {
                type: DataTypes.INTEGER,
                field: 'seat_id'
            },
            timeSlotId: DataTypes.INTEGER,
            status: DataTypes.STRING,
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
