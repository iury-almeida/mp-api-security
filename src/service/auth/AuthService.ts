import { AuthRepository } from '../../repository/auth/AuthRepository';

export class AuthService {
  private readonly authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  // Exemplo de assinatura de método para futura implementação
  // eslint-disable-next-line @typescript-eslint/require-await
  public async login(username: string, password: string): Promise<void> {
    // TODO: Chamar repository, validar usuário, etc.
    void this.authRepository;
  }
}




