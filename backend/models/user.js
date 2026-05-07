'use strict';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
<<<<<<< Updated upstream
    phoneNumber: DataTypes.STRING
=======
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING  // ✅ أضفنا password
>>>>>>> Stashed changes
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });

  return User;
};