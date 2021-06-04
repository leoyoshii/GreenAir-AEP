import usersRouter from '@modules/User/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
