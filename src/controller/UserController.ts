import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      // Get pagination parameters from query string
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const result = await this.userService.getAllUsers(page, limit);
      
      return res.status(200).json({
        message: 'Users retrieved successfully',
        status: 200,
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      });
    } catch (error) {
      console.error('Error getting users:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: 'User ID is required',
        });
      }

      const user = await this.userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({
        message: 'User retrieved successfully',
        status: 200,
        data: user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User ID is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error getting user:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, cpf, password, profileId, email, phone, status } = req.body;

      if (!name || !cpf || !password) {
        return res.status(400).json({
          message: 'Name, CPF and password are required',
        });
      } // ********* check this validation *********

      const user = await this.userService.createUser({ name, cpf, password, profileId, email, phone, status });

      return res.status(201).json({
        message: 'User created successfully',
        status: 201,
        data: user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'CPF already registered') {
        return res.status(409).json({
          message: error.message,
        });
      }

      if (error instanceof Error && error.message === 'Name, CPF and password are required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error creating user:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, cpf, email, phone, status, profileId } = req.body;

      if (!id) {
        return res.status(400).json({
          message: 'User ID is required',
        });
      }

      const user = await this.userService.updateUser(id, { name, cpf, email, phone, status, profileId }); ///todo add status

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({
        message: 'User updated successfully',
        status: 200,
        data: user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return res.status(404).json({
          message: error.message,
        });
      }

      if (error instanceof Error && error.message === 'CPF already registered') {
        return res.status(409).json({
          message: error.message,
        });
      }

      if (error instanceof Error && error.message === 'User ID is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error updating user:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: 'User ID is required',
        });
      }

      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({
        message: 'User deleted successfully',
        status: 200,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return res.status(404).json({
          message: error.message,
        });
      }

      if (error instanceof Error && error.message === 'User ID is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error deleting user:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
