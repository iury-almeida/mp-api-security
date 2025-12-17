import { Router } from 'express';
import { AuthController } from '../controller/auth/AuthController';

export const authRouter = Router();

const authController = new AuthController();

// Rota de login sem implementação de lógica ainda
authRouter.post('/login', (req, res) => authController.login(req, res));




