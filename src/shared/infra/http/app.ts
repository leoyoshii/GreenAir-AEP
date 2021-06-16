import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import 'dotenv/config';
import '@shared/container';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import { AppErrors } from '../errors/AppErrors';
import { APIAdminRoutes } from './routes/APIAdminRoutes';
import { APIOpenRoutes } from './routes/APIOpenRoutes';
import { APICommonRoutes } from './routes/APICommonRoutes';
import { APIMasterRoutes } from './routes/APIMasterRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/master', APIMasterRoutes);
app.use('/admin', APIAdminRoutes);
app.use('/client', APICommonRoutes);
app.use('/live', APIOpenRoutes);
app.use(errors());

app.get('/', (req, res) => {
  res.send('API is working. ');
});

app.use('/files', express.static(uploadConfig.uploadFolder));

console.log(uploadConfig.uploadFolder);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppErrors) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode,
    });
  }
  return response
    .status(500)
    .json({ status: 'error', message: err.message, code: 500, err });
});

export { app };
