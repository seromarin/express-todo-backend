import express, { Request, Response } from 'express';
import path from 'path';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => res.sendFile(path.resolve('src', 'api', 'tasks', 'mocks', 'tasks.mock.json')));