import { hash } from 'bcrypt';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';

import { User } from '../entities/User';

config();

const { ACCESS_TOKEN_SECRET } = process.env;

export const getHashPassword = async (password: string): Promise<string> => await hash(password, 10);

export const generateAccessToken = ({ id }: User) => sign({ id }, ACCESS_TOKEN_SECRET as string, { expiresIn: '30d' });
