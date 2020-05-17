import express from 'express';

import { router as userController } from './controllers/user.controller';

export const router = express.Router();

router.use('/', userController);