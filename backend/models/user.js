export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      tableName: "Users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Booking, {
      foreignKey: "userId",
    });

    User.hasMany(models.Payment, {
      foreignKey: "userId",
    });
  };

  return User;
};
