import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('investnow', 'fullzer4', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

sequelize.sync()
  .then(() => {
    console.log('Tabela "users" criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar tabela "users":', error);
});