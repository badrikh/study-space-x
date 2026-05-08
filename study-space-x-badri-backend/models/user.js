'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING

  }, {

    tableName: 'Users'

  });

  User.associate = function(models) {

    User.hasMany(models.Booking, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Order, {
      foreignKey: 'user_id'
    });

    User.hasMany(models.Payment, {
      foreignKey: 'userId'
    });

  };

  return User;
};