import { compare } from 'bcrypt';
import { Request, Response } from 'express';

import { User } from '../entities/User';
import { generateAccessToken, getHashPassword } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const exists = await User.findOne({ where: { email } });

  if (exists) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  const passwordHash = await getHashPassword(password);

  try {
    const newUser = await User.save({
      email,
      password: passwordHash,
      firstName,
      lastName,
    });

    res.json({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      accessToken: generateAccessToken(newUser),
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    select: ['id', 'email', 'password', 'firstName', 'lastName', 'role'],
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    return res.status(406).json({ message: 'Invalid password' });
  }

  res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    accessToken: generateAccessToken(user),
  });
};
