import { AuthRepository } from '../../repository/auth/AuthRepository';
import jwt from 'jsonwebtoken';

export interface LoginResult {
  token: string;
  user: {
    cpf: string;
  };
}

export class AuthService {
  private readonly authRepository: AuthRepository;
  private readonly MOCKED_CPF = '12345678909';
  private readonly MOCKED_PASSWORD = 'teste123';

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async login(cpf: string, password: string): Promise<LoginResult> {
    // Validate mocked credentials
    if (cpf !== this.MOCKED_CPF || password !== this.MOCKED_PASSWORD) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign(
      { cpf: this.MOCKED_CPF },
      secret,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        cpf: this.MOCKED_CPF,
      },
    };
  }
}




