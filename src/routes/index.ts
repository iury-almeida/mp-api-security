import { Router } from 'express';
import { healthRouter } from './ping.routes';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { profileRouter } from './profile.routes';

export const router = Router();

// Mount routers with explicit paths for clarity
router.use('/', healthRouter);
router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', profileRouter);

// Debug: Log registered routes
console.log('Routes registered:');
console.log('  GET    /api/ping');
console.log('  POST   /api/Login/autenticacao');
console.log('  GET    /api/users');
console.log('  GET    /api/users/:id');
console.log('  POST   /api/users');
console.log('  PUT    /api/users/:id');
console.log('  DELETE /api/users/:id');
console.log('  GET    /api/profiles');
console.log('  GET    /api/profiles/:id');
console.log('  POST   /api/profiles');
console.log('  PUT    /api/profiles/:id');
console.log('  DELETE /api/profiles/:id');




