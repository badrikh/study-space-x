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

  Menu.associate = (models) => {
    Menu.hasMany(models.Order, {
      foreignKey: "menu_id",
    });
  };

  return Menu;
};