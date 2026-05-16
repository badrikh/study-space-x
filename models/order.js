export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_name: DataTypes.STRING,
      prices: DataTypes.FLOAT,
      total_cost: DataTypes.FLOAT,
      order_date: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
      admin_id: DataTypes.INTEGER,
      menu_id: DataTypes.INTEGER,
    },
    {
      tableName: "orders",
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: "user_id",
    });

    Order.belongsTo(models.Menu, {
      foreignKey: "menu_id",
    });
  };

  return Order;
};