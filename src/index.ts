import express, { Request, Response, Application, Router } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// Controllers
import { router as apiController } from './controllers/api.controller';

// Global Variables
const PORT = process.env.PORT || 3001;

// General configurations
dotenv.config();

// App configuratiom
const app: Application = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json({ type: 'application/*+json' }));

// Routes configuration
app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.use('/api', apiController);

// App running
app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server started at http://localhost:${PORT}`);
});
