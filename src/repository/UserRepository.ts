import { AppDataSource } from '../../config/database/data-source';
import { User } from '../entity/User';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class UserRepository {
  private readonly userRepository = AppDataSource.getRepository(User);

  public async findAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<UserWithoutPassword>> {
    try {
      const skip = (page - 1) * limit;
      
      const [users, total] = await this.userRepository.findAndCount({
        select: ['id', 'name', 'cpf', 'profileId', 'email', 'phone', 'status', 'createdAt', 'updatedAt'], // Exclude passwordHash
        relations: ['profile'],
        skip,
        take: limit,
        order: {
          createdAt: 'DESC',
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: users,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      console.error('Error finding all users:', error);
      throw new Error('Database error while searching for users');
    }
  }

  public async findById(id: string): Promise<UserWithoutPassword | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: ['id', 'name', 'cpf', 'profileId', 'email', 'phone', 'status', 'createdAt', 'updatedAt'], // Exclude passwordHash
        relations: ['profile'],
      });
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Database error while searching for user');
    }
  }

  public async findByCpf(cpf: string): Promise<UserWithoutPassword | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { cpf },
        select: ['id', 'name', 'cpf', 'profileId', 'email', 'phone', 'status', 'createdAt', 'updatedAt'], // Exclude passwordHash
        relations: ['profile'],
      });
      return user;
    } catch (error) {
      console.error('Error finding user by CPF:', error);
      throw new Error('Database error while searching for user');
    }
  }

  public async create(userData: { name: string; cpf: string; passwordHash: string; email: string; phone: string; status: string; profileId?: string | null }): Promise<any> {
    try {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      // Return without passwordHash
      const { passwordHash, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Database error while creating user');
    }
  }

  public async update(id: string, userData: Partial<{ name: string; cpf: string; passwordHash: string; profileId?: string | null }>): Promise<UserWithoutPassword | null> {
    try {
      await this.userRepository.update(id, userData);
      const updatedUser = await this.findById(id);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Database error while updating user');
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Database error while deleting user');
    }
  }
}
