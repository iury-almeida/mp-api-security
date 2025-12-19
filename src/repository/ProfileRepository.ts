import { AppDataSource } from '../../config/database/data-source';
import { Profile } from '../entity/Profile';

export class ProfileRepository {
  private readonly profileRepository = AppDataSource.getRepository(Profile);

  public async findAll(): Promise<Profile[]> {
    try {
      const profiles = await this.profileRepository.find();
      return profiles;
    } catch (error) {
      console.error('Error finding all profiles:', error);
      throw new Error('Database error while searching for profiles');
    }
  }

  public async findById(id: string): Promise<Profile | null> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id },
      });
      return profile;
    } catch (error) {
      console.error('Error finding profile by ID:', error);
      throw new Error('Database error while searching for profile');
    }
  }

  public async create(profileData: { name: string }): Promise<Profile> {
    try {
      const profile = this.profileRepository.create(profileData);
      const savedProfile = await this.profileRepository.save(profile);
      return savedProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw new Error('Database error while creating profile');
    }
  }

  public async update(id: string, profileData: Partial<{ name: string }>): Promise<Profile | null> {
    try {
      await this.profileRepository.update(id, profileData);
      const updatedProfile = await this.findById(id);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Database error while updating profile');
    }
  }

  //Maybe it will change to just archieve instead of deleting.
  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.profileRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw new Error('Database error while deleting profile');
    }
  }
}
