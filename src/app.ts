import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes';
import { jwtDecoder } from '../config/middleware/jwtDecoder';

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(jwtDecoder);

  app.use('/api', router);

  return app;
}

