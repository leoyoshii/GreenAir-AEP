import { AuthRouter } from '@modules/User/infra/http/routes/Auth.routes';
import { Router } from 'express';

const APIOpenRoutes = Router();

APIOpenRoutes.use('/auth', AuthRouter);

export { APIOpenRoutes };
