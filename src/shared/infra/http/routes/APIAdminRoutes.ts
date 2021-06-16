import { EnumUserRole } from '@modules/User/interfaces/EnumUserRole';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import ensureRoles from '../middlewares/ensureRoles';

const APIAdminRoutes = Router();

APIAdminRoutes.use(ensureAuthenticated);
APIAdminRoutes.use(ensureRoles([EnumUserRole.API_ADMIN]));

export { APIAdminRoutes };
