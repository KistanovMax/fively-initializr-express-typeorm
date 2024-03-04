import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1] || '';

    const tokenPayload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: tokenPayload.id })
      .getOneOrFail();

    req.body.user = user;

    return next();
  } catch (error) {
    return res.status(401).send({
      message: 'Unauthorized',
    });
  }
};
