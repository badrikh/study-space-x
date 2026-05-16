export default (sequelize, DataTypes) => {
    const Menu = sequelize.define(
        "Menu",
        {
            name: DataTypes.STRING,
            price: DataTypes.FLOAT,
            itemNumber: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            tableName: "menus",
        }
    );

    return Menu;
};
