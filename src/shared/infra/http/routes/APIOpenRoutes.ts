import authRouter from '@modules/User/infra/http/routes/auth.routes';
import { Router } from 'express';

const APIOpenRoutes = Router();

APIOpenRoutes.use('/auth', authRouter);

export { APIOpenRoutes };
