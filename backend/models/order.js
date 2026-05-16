export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_name: DataTypes.STRING,
      prices: DataTypes.FLOAT,
      total_cost: DataTypes.FLOAT,
      order_date: DataTypes.DATE,
      menu_id: DataTypes.INTEGER,
      booking_id: DataTypes.INTEGER,
      items: DataTypes.JSON,
      total: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Booking, { foreignKey: "booking_id" });
    Order.belongsTo(models.Menu, { foreignKey: "menu_id" });
    Order.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Order;
};
