export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Menu, {
      foreignKey: "categoryId",
    });
  };

  return Category;
};
