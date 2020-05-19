import express, { Request, Response, Application, Router } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import jwt from 'jsonwebtoken';

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
app.use(express.urlencoded({ extended: true }));

// Routes configuration
app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
app.use('/api', apiController);

// app.post(
//   '/signup',
//   passport.authenticate('signup', { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: 'Signup successful',
//       user: req.user,
//     });
//   }
// );

// app.post('/login', async (req, res, next) => {
//   passport.authenticate('login', async (err, user, info) => {
//     try {
//       if (err || !user) {
//         const error = new Error('An Error occurred');
//         return next(error);
//       }
//       req.login(user, { session: false }, async (error) => {
//         if (error) return next(error);
//         // We don't want to store the sensitive information such as the
//         // user password in the token so we pick only the email and id
//         const body = { _id: user._id, email: user.email };
//         // Sign the JWT token and populate the payload with the user email and id
//         const token = jwt.sign({ user: body }, 'top_secret');
//         // Send back the token to the user
//         return res.json({ token });
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// });

// app.get(
//   '/profile',
//   passport.authenticate('bearer', { session: false }),
//   (req: Request, res: Response) => {
//     res.json(req.user);
//   }
// );
app.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    // We'll just send back the user details and the token
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

// App running
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
