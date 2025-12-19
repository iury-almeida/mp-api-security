import { Router } from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = Router();

const userController = new UserController();

// GET /api/users - Get all users
userRouter.get('/users', (req, res) => {
  userController.getAllUsers(req, res).catch((error) => {
    console.error('Error in get all users route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// GET /api/users/:id - Get user by ID
userRouter.get('/users/:id', (req, res) => {
  userController.getUserById(req, res).catch((error) => {
    console.error('Error in get user by ID route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// POST /api/users - Create new user
userRouter.post('/users', (req, res) => {
  userController.createUser(req, res).catch((error) => {
    console.error('Error in create user route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// PUT /api/users/:id - Update user
userRouter.put('/users/:id', (req, res) => {
  userController.updateUser(req, res).catch((error) => {
    console.error('Error in update user route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// DELETE /api/users/:id - Delete user
userRouter.delete('/users/:id', (req, res) => {
  userController.deleteUser(req, res).catch((error) => {
    console.error('Error in delete user route:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});
