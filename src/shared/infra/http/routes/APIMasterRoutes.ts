import { masterUsersRouter } from '@modules/User/infra/http/routes/MasterUsers.routes';
import { EnumUserRole } from '@modules/User/interfaces/EnumUserRole';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import ensureRoles from '../middlewares/ensureRoles';

const APIMasterRoutes = Router();

APIMasterRoutes.use(ensureAuthenticated);
APIMasterRoutes.use(ensureRoles([EnumUserRole.API_MASTER]));

APIMasterRoutes.use('/users', masterUsersRouter);

export { APIMasterRoutes };
