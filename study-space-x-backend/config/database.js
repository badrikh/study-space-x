import { Sequelize } from "sequelize";
import "./env.js";

const sequelize = new Sequelize(
  process.env.DB_NAME || "space",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 10000,
    },
  }
);

export default sequelize;
