import { ProfileRepository } from '../repository/ProfileRepository';
import { Profile } from '../entity/Profile';

export interface CreateProfileData {
  name: string;
}

export interface UpdateProfileData {
  name?: string;
}

export class ProfileService {
  private readonly profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  public async getAllProfiles(): Promise<Profile[]> {
    return await this.profileRepository.findAll();
  }

  public async getProfileById(id: string): Promise<Profile | null> {
    if (!id) {
      throw new Error('Profile ID is required');
    }
    return await this.profileRepository.findById(id);
  }

  public async createProfile(profileData: CreateProfileData): Promise<Profile> {
    if (!profileData.name) {
      throw new Error('Name is required');
    }

    return await this.profileRepository.create({
      name: profileData.name,
    });
  }

  public async updateProfile(id: string, profileData: UpdateProfileData): Promise<Profile | null> {
    if (!id) {
      throw new Error('Profile ID is required');
    }

    // Check if profile exists
    const existingProfile = await this.profileRepository.findById(id);
    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    const updateData: Partial<{ name: string }> = {};
    
    if (profileData.name) {
      updateData.name = profileData.name;
    }

    return await this.profileRepository.update(id, updateData);
  }

  public async deleteProfile(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Profile ID is required');
    }

    // Check if profile exists
    const existingProfile = await this.profileRepository.findById(id);
    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    return await this.profileRepository.delete(id);
  }
}
