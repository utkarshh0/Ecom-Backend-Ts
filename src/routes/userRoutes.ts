import { Router } from 'express';
import { createUser, updateUser, getUser } from '../controllers/userController';

const router = Router();

// User routes
router.post('/', createUser);  // Create a new user
router.put('/:id', updateUser);  // Update user by ID
router.get('/:id', getUser);  // Get user by ID

export default router;
