import { UserRepository, UserWithoutPassword, PaginatedResult } from '../repository/UserRepository';
import bcrypt from 'bcrypt';

export interface CreateUserData {
  name: string;
  cpf: string;
  password: string;
  phone: string;
  email: string;
  status: string;
  profileId?: string | null;
}

export interface UpdateUserData {
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  status?: string;
  profileId?: string | null;
}

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getAllUsers(page: number = 1, limit: number = 10): Promise<PaginatedResult<UserWithoutPassword>> {
    // Validate pagination parameters
    const pageNumber = Math.max(1, Math.floor(page));
    const limitNumber = Math.max(1, Math.min(100, Math.floor(limit))); // Max 100 items per page
    
    return await this.userRepository.findAll(pageNumber, limitNumber);
  }

  public async getUserById(id: string): Promise<UserWithoutPassword | null> {
    if (!id) {
      throw new Error('User ID is required');
    }
    return await this.userRepository.findById(id);
  }

  public async getUserByCpf(cpf: string): Promise<UserWithoutPassword | null> {
    if (!cpf) {
      throw new Error('CPF is required');
    }
    return await this.userRepository.findByCpf(cpf);
  }

  public async createUser(userData: CreateUserData): Promise<UserWithoutPassword> {
    if (!userData.name || !userData.cpf || !userData.password) {
      throw new Error('Name, CPF and password are required');
    }

    // Check if CPF already exists
    const existingUser = await this.userRepository.findByCpf(userData.cpf);
    if (existingUser) {
      throw new Error('CPF already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(userData.password, 10);

    return await this.userRepository.create({
      name: userData.name,
      cpf: userData.cpf,
      passwordHash,
      email: userData.email,
      phone: userData.phone,
      status: userData.status,
      profileId: userData.profileId || null,
    });
  }

  public async updateUser(id: string, userData: UpdateUserData): Promise<UserWithoutPassword | null> {
    if (!id) {
      throw new Error('User ID is required');
    }

    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // If CPF is being updated, check if it's already taken
    // if (userData.cpf && userData.cpf !== existingUser.cpf) {
    //   const cpfExists = await this.userRepository.findByCpf(userData.cpf);
    //   if (cpfExists) {
    //     throw new Error('CPF already registered');
    //   }
    // }

    const updateData: Partial<{ name: string; cpf: string; email: string; phone: string; status: string; profileId?: string | null }> = {};
    
    if (userData.name) {
      updateData.name = userData.name;
    }
    
    if (userData.cpf) {
      updateData.cpf = userData.cpf;
    }
    

    if (userData.phone) {
      updateData.phone = userData.phone;
    }

    if (userData.email) {
      updateData.email = userData.email;
    }

    if (userData.status) {
      updateData.status = userData.status;
    }
     
    if (userData.profileId !== undefined) {
      updateData.profileId = userData.profileId;
    }

    return await this.userRepository.update(id, updateData);
  }

  public async deleteUser(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('User ID is required');
    }

    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return await this.userRepository.delete(id);
  }
}
