import { Router } from 'express';

import { createApplication, getApplicationsByJobId } from '../controllers/application.controller';
import { isAuth } from '../middlewares/isAuth';

const applicationRouter = Router();

applicationRouter.post('/:id', createApplication);

applicationRouter.get('/:id', isAuth, getApplicationsByJobId);

export default applicationRouter;
