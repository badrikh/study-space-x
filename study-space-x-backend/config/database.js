import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "space",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Borooj123458**",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  }
);

export default sequelize;