import { Router, Response } from 'express';

import { getMe } from '../controllers/user.controller';
import { isAuth } from '../middlewares/isAuth';

import applicationRouter from './application.route';
import authRouter from './auth.route';
import jobRouter from './job.route';

const apiRouter = Router();

apiRouter.get('/healthcheck', async (_, res: Response) => {
  res.status(200).send({ message: 'Success' });
});
apiRouter.use('/auth', authRouter);
apiRouter.use('/me', isAuth, getMe);
apiRouter.use('/jobs', jobRouter);
apiRouter.use('/applications', applicationRouter);

export default apiRouter;
