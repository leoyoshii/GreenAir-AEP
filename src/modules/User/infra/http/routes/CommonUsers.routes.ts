import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CommonUserController } from '../controllers/CommonUserController';
import { FriendshipController } from '../controllers/FriendshipController';

const commonUsersRouter = Router();
const commonUserController = new CommonUserController();
const friendshipController = new FriendshipController();

const upload = multer(uploadConfig.multer);

commonUsersRouter.get('/profile', commonUserController.show);
commonUsersRouter.get('/friends', commonUserController.getFriends);

commonUsersRouter.put(
  '/profile',
  upload.single('avatarFilename'),
  celebrate({
    [Segments.BODY]: {
      areaCodePhone: Joi.string(),
      avatarFilename: Joi.string(),
      biografy: Joi.string(),
      city: Joi.string(),
      confirmPassword: Joi.string(),
      gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
      name: Joi.string(),
      otherGender: Joi.string(),
      password: Joi.string(),
      phone: Joi.string(),
      state: Joi.string(),
    },
  }),
  commonUserController.update,
);

//Friendship
commonUsersRouter.post(
  '/friendship',
  celebrate({
    [Segments.BODY]: {
      requestedId: Joi.string().uuid().required(),
    },
  }),
  friendshipController.addfriend,
);

commonUsersRouter.get(
  '/friendship',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
      findType: Joi.string()
        .valid('ALL', 'REQUESTER', 'REQUESTED')
        .default('ALL'),
      status: Joi.string().valid('PENDING', 'ACCEPTED', 'DECLINED', 'BLOQUED'),
      orderName: Joi.string().valid('createdAt', 'updatedAt', 'status'),
      order: Joi.string().valid('ASC', 'DESC'),
    },
  }),
  friendshipController.listFriendships,
);

commonUsersRouter.patch(
  '/friendship/:friendshipId',
  celebrate({
    [Segments.PARAMS]: {
      friendshipId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string().valid('ACCEPTED', 'DECLINED', 'BLOQUED').required(),
    },
  }),
  friendshipController.updateFriendship,
);

export { commonUsersRouter };
