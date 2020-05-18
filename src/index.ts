import express, { Request, Response, Application, Router } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';

// General configurations
dotenv.config();

// Import controllers
import { router as apiController } from './api';
import { mongooseConnection } from './config/mongoose';

// Requires
// tslint:disable-next-line: no-var-requires
require('./config/passport');

// Global Variables
const PORT = process.env.PORT || 3001;
mongooseConnection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

// App configuratiom
const app: Application = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

// Routes configuration
app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
app.use('/api', apiController);

app.get(
  '/profile',
  passport.authenticate('bearer', { session: false }),
  (req: Request, res: Response) => {
    res.json(req.user);
  }
);

// App running
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
