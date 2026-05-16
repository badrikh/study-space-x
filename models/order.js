export default (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            order_name: DataTypes.STRING,
            prices: DataTypes.FLOAT,
            total_cost: DataTypes.FLOAT,
            order_date: DataTypes.DATE,
            booking_id: DataTypes.INTEGER,
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending'
            },
        },
        {
            tableName: "orders",
        }
    );

    return Order;
};
