import cors from 'cors';
import express, { json, urlencoded } from 'express';

import apiRouter from './routes';

export default async () => {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_ENDPOINT }));

  app.use(json());

  app.use(urlencoded({ extended: true }));

  app.use('/', apiRouter);

  return app;
};
