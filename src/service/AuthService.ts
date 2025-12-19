import { AuthRepository } from '../repository/AuthRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface LoginResult {
  token: string;
  user: {
    id: string;
    cpf: string;
    name: string;
  };
}

export class AuthService {
  private readonly authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async login(cpf: string, password: string): Promise<LoginResult> {
    if (!cpf || !password) {
      throw new Error('CPF and password are required');
    }

    const user = await this.authRepository.findUserByCpf(cpf);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign(
      { 
        id: user.id,
        cpf: user.cpf,
        name: user.name
      },
      secret,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        cpf: user.cpf,
        name: user.name,
      },
    };
  }
}




