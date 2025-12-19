import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes';
import { jwtDecoder } from '../config/middleware/jwtDecoder';

export function createApp(): Application {
  
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));

  // Debug middleware to log all requests
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // Body parser middleware
  // Parse JSON bodies (application/json)
  app.use(express.json({ limit: '10mb' }));
  
  // Parse URL-encoded bodies (application/x-www-form-urlencoded)
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(jwtDecoder);

  // Health check route at root
  app.get('/', (req, res) => {
    res.json({ message: 'API is running', endpoints: { ping: '/api/ping' } });
  });

  app.use('/api', router);

  // 404 handler for debugging
  app.use((req, res) => {
    console.log('404 - Route not found:', req.method, req.path);
    res.status(404).json({ 
      message: 'Route not found', 
      method: req.method, 
      path: req.path,
      availableRoutes: ['/api/ping', '/api/Login/autenticacao']
    });
  });

  return app;
}

