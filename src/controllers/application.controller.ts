import { Request, Response } from 'express';

import { Application } from '../entities/Application';
import { Job } from '../entities/Job';

export const createApplication = async (req: Request, res: Response) => {
  const jobId = +req.params.id;

  const job = await Job.findOneBy({ id: jobId });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  try {
    const newApplication = (await Application.save({ job, ...req.body })) as Application;

    const { id, firstName, lastName, email, text, createdAt } = newApplication;

    res.json({ id, firstName, lastName, email, text, createdAt });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getApplicationsByJobId = async (req: Request, res: Response) => {
  const { user } = req.body;
  const jobId = +req.params.id;
  const { limit = 10, offset = 0 } = req.query;

  const job = await Job.findOne({ where: { id: jobId }, relations: { user: true } });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (user.id !== job.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const [applications, count] = await Application.findAndCount({
    where: { job: { id: job.id } },
    take: +limit,
    skip: +offset,
  });

  res.json({ count, applications });
};
