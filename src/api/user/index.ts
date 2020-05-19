import express from 'express';

import { router as userController } from './controllers/profile.controller';
import { router as userEditController } from './controllers/edit.controller';

export const router = express.Router();

router.use('/profile', userController);
router.use('/edit', userEditController);
