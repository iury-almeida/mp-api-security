import { Router } from 'express';
import { ProfileController } from '../controller/ProfileController';

export const profileRouter = Router();

const profileController = new ProfileController();

// use for dropdowns
profileRouter.get('/profiles', (req, res) => {
  profileController.getAllProfiles(req, res).catch((error) => {
    console.error('Error in get all profiles route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

profileRouter.get('/profiles/:id', (req, res) => {
  profileController.getProfileById(req, res).catch((error) => {
    console.error('Error in get profile by ID route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

profileRouter.post('/profiles', (req, res) => {
  profileController.createProfile(req, res).catch((error) => {
    console.error('Error in create profile route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

profileRouter.put('/profiles/:id', (req, res) => {
  profileController.updateProfile(req, res).catch((error) => {
    console.error('Error in update profile route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

profileRouter.delete('/profiles/:id', (req, res) => {
  profileController.deleteProfile(req, res).catch((error) => {
    console.error('Error in delete profile route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});
