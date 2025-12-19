import { Router } from 'express';
import { healthRouter } from './ping.routes';
import { authRouter } from './auth.routes';

export const router = Router();

// Mount routers with explicit paths for clarity
router.use('/', healthRouter);
router.use('/', authRouter);

// Debug: Log registered routes
console.log('Routes registered:');
console.log('  GET  /api/ping');
console.log('  POST /api/Login/autenticacao');




