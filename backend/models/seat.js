export default (sequelize, DataTypes) => {
    const Seat = sequelize.define(
        "Seat",
        {
            seatNumber: DataTypes.STRING,
            status: DataTypes.STRING,
            name_of_room: DataTypes.STRING, // ← أضفنا هاد عشان الفرونت بيدور عليه
        },
        { tableName: "seats" }
    );

    Seat.associate = (models) => {
        Seat.hasMany(models.Booking, { foreignKey: "seatId" });
    };

    return Seat;
};
