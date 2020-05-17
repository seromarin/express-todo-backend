import express, { Application, Router, Request, Response } from 'express';

const app: Application = express();
export const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => res.json({ hello: 'world' }))