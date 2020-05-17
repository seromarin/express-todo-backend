import express from 'express';

import { router as loginController } from './controllers/login.controller';
import { router as registerController } from './controllers/register.controller';

export const router = express.Router();

router.use('/login', loginController);
router.use('/register', registerController);
