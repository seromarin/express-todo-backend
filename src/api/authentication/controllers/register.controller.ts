import express, { Request, Response } from 'express';
import { User } from '../../../models/user.model';
import { IUser } from '../../../interfaces/user.interface';

export const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const newUser = await createNewUser(req.body);
  res.json(newUser);
  // res.json({ user: true })
});

function createNewUser(user: IUser) {
  const { firstName, lastName, email, password } = user;

  // Replace with joi validation
  if (!firstName) throw new Error('No first name passed');
  if (!lastName) throw new Error('No last name passed');
  if (!email) throw new Error('No email passed');
  if (!password) throw new Error('No password passed');

  return User.create(user);
}
