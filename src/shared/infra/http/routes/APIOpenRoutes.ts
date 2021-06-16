import { AuthRouter } from '@modules/User/infra/http/routes/auth.routes';
import { Router } from 'express';

const APIOpenRoutes = Router();

APIOpenRoutes.use('/auth', AuthRouter);

export { APIOpenRoutes };
