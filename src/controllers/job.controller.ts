import { Request, Response } from 'express';

import { Job } from '../entities/Job';

export const getAllJobs = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0 } = req.query;

  const [jobs, count] = await Job.findAndCount({ take: +limit, skip: +offset });

  res.json({ count, jobs });
};

export const getUserJobs = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { limit = 10, offset = 0 } = req.query;

  const [jobs, count] = await Job.findAndCount({
    relations: { applications: true },
    where: { user: { id: user.id } },
    take: +limit,
    skip: +offset,
  });

  res.json({
    count,
    jobs: jobs.map(({ id, title, description, createdAt, applications }) => ({
      id,
      title,
      description,
      createdAt,
      applications: applications.length,
    })),
  });
};

export const getUserJobById = async (req: Request, res: Response) => {
  const { user } = req.body;
  const jobId = +req.params.id;

  const job = await Job.findOne({ where: { id: jobId, user: { id: user.id } }, relations: { user: true } });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (user.id !== job.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id, title, description, createdAt } = job;

  res.json({ id, title, description, createdAt });
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const newJob = (await Job.save(req.body)) as Job;

    const { id, title, description, createdAt } = newJob;

    res.json({ id, title, description, createdAt });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { user } = req.body;
  const jobId = +req.params.id;

  const job = await Job.findOne({ where: { id: jobId, user: { id: user.id } }, relations: { user: true } });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (user.id !== job.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    await Job.remove(job);

    const { title, description, createdAt } = job;

    res.json({ id: jobId, title, description, createdAt });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  const { user, id: jobId } = req.body;

  const job = await Job.findOne({ where: { id: jobId, user: { id: user.id } }, relations: { user: true } });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (user.id !== job.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const updatedJob = (await Job.save(req.body)) as Job;

    const { createdAt } = job;
    const { id, title, description } = updatedJob;

    res.json({ id, title, description, createdAt });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
