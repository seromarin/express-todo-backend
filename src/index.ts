import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
