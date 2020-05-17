import express from 'express';

import { router as authenticationController } from './authentication'

export const router = express.Router();

router.use('/authentication', authenticationController)