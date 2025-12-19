import { AppDataSource } from '../../../config/database/data-source';
import { User } from '../../entity/User';

export class AuthRepository {
  private readonly userRepository = AppDataSource.getRepository(User);

  public async findUserByCpf(cpf: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { cpf },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by CPF:', error);
      throw new Error('Database error while searching for user');
    }
  }
}