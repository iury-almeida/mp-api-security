import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes';
import { jwtDecoder } from '../config/middleware/jwtDecoder';

export function createApp(): Application {

  console.log('process: ', process.env.DB_PASSWORD || false);
  
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(jwtDecoder);

  // Health check route at root
  app.get('/', (req, res) => {
    res.json({ message: 'API is running', endpoints: { ping: '/api/ping' } });
  });

  app.use('/api', router);

  return app;
}

