import { Router } from 'express';
import { healthRouter } from './ping.routes';
import { authRouter } from './auth.routes';

export const router = Router();

router.use(healthRouter);
router.use(authRouter);




