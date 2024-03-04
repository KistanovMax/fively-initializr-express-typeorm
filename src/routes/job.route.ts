import { Router } from 'express';

import {
  createJob,
  deleteJob,
  getUserJobById,
  getAllJobs,
  updateJob,
  getUserJobs,
} from '../controllers/job.controller';
import { isAuth } from '../middlewares/isAuth';

const jobRouter = Router();

jobRouter.get('/', getAllJobs);

jobRouter.get('/user-jobs', isAuth, getUserJobs);
jobRouter.get('/:id', isAuth, getUserJobById);
jobRouter.post('/', isAuth, createJob);
jobRouter.delete('/:id', isAuth, deleteJob);
jobRouter.put('/', isAuth, updateJob);

export default jobRouter;
