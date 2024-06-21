import { Router } from 'express';
import {validateUpdateUserInput} from '../middleware/validationMiddleware.js'

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions("admin"), getApplicationStats);
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;