import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/models'],
});

sequelize.authenticate();
