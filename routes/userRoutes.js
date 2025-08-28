import Router from 'express';
import {
  createUser,
  getAllUsers,
  getAUser,
  getByqueryParams,
  editUser,
  editProfile,
  deleteUser
} from '../controllers/userApi/barrel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const userRouter = Router();

userRouter
  // Create user
  .post('/user/create', createUser)
  // // Get all users (admin only)
  .get('/users', authMiddleware, adminMiddleware, getAllUsers)
  // Get single user by ID
  .get('/user/:id', authMiddleware, getAUser)
  // // Get by query
  .get('/usersByquery', authMiddleware, getByqueryParams)
  // // Update user
  .put('/user/update/:id', authMiddleware, editUser)
  // Update profile
  .put('/profile/update/:id', authMiddleware, editProfile)
  // Delete user
  .delete('/user/delete/:id', authMiddleware, deleteUser);

export default userRouter;
