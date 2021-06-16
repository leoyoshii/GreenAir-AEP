import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { MasterUserController } from '../controllers/MasterUserController';

const masterUsersRouter = Router();
const masterUserController = new MasterUserController();

masterUsersRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
      role: Joi.string()
        .valid('API_MASTER', 'API_ADMIN', 'API_COMMON')
        .required(),
      otherGender: Joi.string(),
    },
  }),
  masterUserController.create,
);

export { masterUsersRouter };
