import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/AuthService';

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: any, res: Response): Promise<Response> {
    try {
      const { cpf, password } = req.query;

      if (!cpf || !password) {
        return res.status(400).json({
          message: 'CPF and password are required',
        });
      }

      const result = await this.authService.login(cpf, password);

      return res.status(200).json({
        message: 'Login successful',
        status: 200,
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        return res.status(401).json({
          message: 'Access denied - Invalid credentials',
        });
      }

      if (error instanceof Error && error.message === 'JWT_SECRET is not configured') {
        return res.status(500).json({
          message: 'Server configuration error',
        });
      }

      if (error instanceof Error && error.message === 'CPF and password are required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Login error:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}




