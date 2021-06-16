import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { celebrate, Joi, Segments } from 'celebrate';
import { SuggestionController } from '../controllers/SuggestionController';

const suggestionRouter = Router();
const suggestionController = new SuggestionController();
const upload = multer(uploadConfig.multer);

suggestionRouter.post(
  '/',
  upload.array('photos'),
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      positionLat: Joi.number().precision(10).required(),
      positionLng: Joi.number().precision(11).required(),
      hasPost: Joi.boolean().default(false),
      postText: Joi.alternatives().conditional('hasPost', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string(),
      }),
      postTitle: Joi.alternatives().conditional('hasPost', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string(),
      }),
    },
  }),
  suggestionController.create,
);

suggestionRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  suggestionController.listMy,
);

export { suggestionRouter };
