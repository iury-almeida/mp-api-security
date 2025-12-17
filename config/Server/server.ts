import 'reflect-metadata';
import { createApp } from '../../src/app';
import dotenv from 'dotenv';
import { AppDataSource } from '../database/data-source';

dotenv.config();

const app = createApp();

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MySQL connected with TypeORM.');

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Error during Data Source initialization', error);
    process.exit(1);
  });
