import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('investnow', 'fullzer4', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});