import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { PostController } from '../controllers/PostController';
import { celebrate, Joi, Segments } from 'celebrate';

const postRouter = Router();
const postController = new PostController();
const upload = multer(uploadConfig.multer);

postRouter.post(
  '/',
  upload.array('photos'),
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      text: Joi.string(),
    },
  }),
  postController.create,
);

postRouter.put(
  '/:postId',
  upload.array('photos'),
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string(),
      text: Joi.string(),
    },
  }),
  postController.update,
);

postRouter.post(
  '/:postId',
  upload.array('photos'),
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      comment: Joi.string(),
      favorite: Joi.boolean(),
      like: Joi.boolean(),
    },
  }),
  postController.createAReaction,
);

postRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
      findType: Joi.string().valid('ALL', 'ONLYFRIENDS').default('ALL'),
      orderName: Joi.string().valid(
        'createdAt',
        'updatedAt',
        'ownerId',
        'title',
      ),
      order: Joi.string().valid('ASC', 'DESC'),
    },
  }),
  postController.listAll,
);

export { postRouter };
