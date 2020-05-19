import express, { Request, Response } from 'express';
import passport from 'passport';

export const router = express.Router();

router.post(
  '/',
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
