import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../src/entity/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 1,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  entities: [User], // ***** DO NOT FORGET TO ADD THE ENTITIES HERE *******
  synchronize: true, // Apenas para ambiente de desenvolvimento
  logging: false,
});



