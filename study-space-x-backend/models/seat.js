export default (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "Seat",
    {
      seatNumber: DataTypes.STRING,
    },
    {
      tableName: "seats",
    }
  );

  Seat.associate = (models) => {
    Seat.hasMany(models.Booking, {
      foreignKey: "seatId",
    });
  };

  return Seat;
};