import express from 'express';

import { router as taskController } from './controllers/tasks.controller';

export const router = express.Router();

router.use('/', taskController);