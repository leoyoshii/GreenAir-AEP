import { adminComplaintRouter } from '@modules/Complaint/infra/http/routes/AdminComplaint.routes';
import { adminSuggestionRouter } from '@modules/Suggestion/infra/http/routes/AdminSuggestion.routes';
import { EnumUserRole } from '@modules/User/interfaces/EnumUserRole';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import ensureRoles from '../middlewares/ensureRoles';

const APIAdminRoutes = Router();

APIAdminRoutes.use(ensureAuthenticated);
APIAdminRoutes.use(
  ensureRoles([EnumUserRole.API_ADMIN, EnumUserRole.API_MASTER]),
);

APIAdminRoutes.use('/complaints', adminComplaintRouter);
APIAdminRoutes.use('/suggestions', adminSuggestionRouter);

export { APIAdminRoutes };
