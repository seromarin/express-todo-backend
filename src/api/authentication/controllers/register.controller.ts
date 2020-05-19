import express, { Request, Response } from 'express';
import { User } from '../../../models/user.model';
import { IUser } from '../../../interfaces/user.interface';

import passport from 'passport';

export const router = express.Router();

router.post(
  '/',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    // const newUser = await createNewUser(req.body)
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  }
);

function createNewUser(user: IUser) {
  const { firstName, lastName, email, password } = user;

  // Replace with joi validation
  if (!firstName) throw new Error('No first name passed');
  if (!lastName) throw new Error('No last name passed');
  if (!email) throw new Error('No email passed');
  if (!password) throw new Error('No password passed');

  return User.create(user);
}
