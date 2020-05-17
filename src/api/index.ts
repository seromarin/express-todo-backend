import express from 'express';

import { router as authenticationController } from './authentication';
import { router as userController } from './user';
import { router as taskController } from './tasks';

export const router = express.Router();

router.use('/authentication', authenticationController);
router.use('/user', userController);
router.use('/tasks', taskController);
