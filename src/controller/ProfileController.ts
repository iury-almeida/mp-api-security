import { Request, Response } from 'express';
import { ProfileService } from '../service/ProfileService';

export class ProfileController {
  private readonly profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  public async getAllProfiles(req: Request, res: Response): Promise<Response> {
    try {
      const profiles = await this.profileService.getAllProfiles();
      return res.status(200).json({
        message: 'Profiles retrieved successfully',
        status: 200,
        data: profiles,
      });
    } catch (error) {
      console.error('Error getting profiles:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async getProfileById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: 'Profile ID is required',
        });
      }

      const profile = await this.profileService.getProfileById(id);

      if (!profile) {
        return res.status(404).json({
          message: 'Profile not found',
        });
      }

      return res.status(200).json({
        message: 'Profile retrieved successfully',
        status: 200,
        data: profile,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Profile ID is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error getting profile:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async createProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          message: 'Name is required',
        });
      }

      const profile = await this.profileService.createProfile({ name });

      return res.status(201).json({
        message: 'Profile created successfully',
        status: 201,
        data: profile,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Name is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error creating profile:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!id) {
        return res.status(400).json({
          message: 'Profile ID is required',
        });
      }

      const profile = await this.profileService.updateProfile(id, { name });

      if (!profile) {
        return res.status(404).json({
          message: 'Profile not found',
        });
      }

      return res.status(200).json({
        message: 'Profile updated successfully',
        status: 200,
        data: profile,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Profile not found') {
        return res.status(404).json({
          message: error.message,
        });
      }

      if (error instanceof Error && error.message === 'Profile ID is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error updating profile:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  public async deleteProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: 'Profile ID is required',
        });
      }

      const deleted = await this.profileService.deleteProfile(id);

      if (!deleted) {
        return res.status(404).json({
          message: 'Profile not found',
        });
      }

      return res.status(200).json({
        message: 'Profile deleted successfully',
        status: 200,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Profile not found') {
        return res.status(404).json({
          message: error.message,
        });
      }

      if (error instanceof Error && error.message === 'Profile ID is required') {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error('Error deleting profile:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
