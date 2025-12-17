import { Router } from 'express';
import { AuthController } from '../controller/auth/AuthController';

export const authRouter = Router();

const authController = new AuthController();

// Rota de login
authRouter.post('/Login/autenticacao', (req, res) => {
  authController.login(req, res).catch((error) => {
    console.error('Error in login route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});


