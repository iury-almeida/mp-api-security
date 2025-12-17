import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/AuthService';

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Endpoint de login ainda sem lógica de autenticação implementada
  public async login(req: Request, res: Response): Promise<Response> {
    // TODO: Implementar fluxo de autenticação (validação de credenciais, geração de JWT, etc.)
    return res.status(501).json({
      message: 'Login ainda não implementado.',
    });
  }
}




