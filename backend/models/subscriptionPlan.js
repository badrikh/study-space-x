import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SubscriptionPlan = sequelize.define(
  "SubscriptionPlan",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    oldPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    durationDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    features: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    isBestValue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    discountText: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "SubscriptionPlans",
    timestamps: true,
  }
);

export default SubscriptionPlan;
