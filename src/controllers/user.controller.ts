import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response) => {
  const { user } = req.body;

  res.json(user);
};
