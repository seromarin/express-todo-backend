import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';

// Global Variables
const PORT = process.env.PORT || 3001;

// General configurations
dotenv.config();

// App configuratiom
const app: Application = express();

app.use(compression());

// Routes configuration
app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

// App running
app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server started at http://localhost:${PORT}`);
});
