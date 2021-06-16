import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import ensureRoles from '../middlewares/ensureRoles';
import { EnumUserRole } from '@modules/User/interfaces/EnumUserRole';
import { commonUsersRouter } from '@modules/User/infra/http/routes/CommonUsers.routes';
import { postRouter } from '@modules/Post/infra/http/routes/Post.routes';
import { complaintRouter } from '@modules/Complaint/infra/http/routes/Complaint.routes';
import { suggestionRouter } from '@modules/Suggestion/infra/http/routes/Suggestion.routes';

const APICommonRoutes = Router();

APICommonRoutes.use(ensureAuthenticated);
APICommonRoutes.use(
  ensureRoles([
    EnumUserRole.API_COMMON,
    EnumUserRole.API_ADMIN,
    EnumUserRole.API_MASTER,
  ]),
);

APICommonRoutes.use('/users', commonUsersRouter);
APICommonRoutes.use('/posts', postRouter);
APICommonRoutes.use('/complaints', complaintRouter);
APICommonRoutes.use('/suggestions', suggestionRouter);

export { APICommonRoutes };
