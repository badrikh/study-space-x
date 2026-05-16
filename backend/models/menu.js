export default (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      itemNumber: DataTypes.INTEGER,
      description: DataTypes.STRING,
      category: {
        type: DataTypes.STRING,
        defaultValue: "Food",
      },
      categoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "menus",
      timestamps: true,
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
    Menu.hasMany(models.Order, {
      foreignKey: "menu_id",
    });
  };

  return Menu;
};
