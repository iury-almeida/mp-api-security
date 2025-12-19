import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../src/entity/User';
import { Profile } from '../../src/entity/Profile';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  // Default MySQL port is 3306 if DB_PORT is not defined
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Drums6@',
  database: process.env.DB_NAME || 'MultipecasDB',
  entities: [User, Profile], // ***** DO NOT FORGET TO ADD THE ENTITIES HERE *******
  synchronize: true, // Apenas para ambiente de desenvolvimento
  logging: false,
});



