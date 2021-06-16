import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import ensureRoles from '../middlewares/ensureRoles';
import { EnumUserRole } from '@modules/User/interfaces/EnumUserRole';
import { commonUsersRouter } from '@modules/User/infra/http/routes/CommonUsers.routes';

const APICommonRoutes = Router();

APICommonRoutes.use(ensureAuthenticated);
APICommonRoutes.use(ensureRoles([EnumUserRole.API_COMMON]));

APICommonRoutes.use('/users', commonUsersRouter);

export { APICommonRoutes };
