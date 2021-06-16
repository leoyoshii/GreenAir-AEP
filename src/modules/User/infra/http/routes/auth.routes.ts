import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { AuthController } from '../controllers/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.login,
);

authRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
      otherGender: Joi.string(),
    },
  }),
  authController.register,
);

export default authRouter;
