const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define(
  "Payment",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

Payment.associate = function(models) {

  Payment.belongsTo(models.User, {
    foreignKey: 'userId'
  });

  Payment.belongsTo(models.Booking, {
    foreignKey: 'bookingId'
  });

};

module.exports = Payment;