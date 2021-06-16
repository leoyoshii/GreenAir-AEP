import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { celebrate, Joi, Segments } from 'celebrate';
import { ComplaintController } from '../controllers/ComplaintController';

const complaintRouter = Router();
const complaintController = new ComplaintController();
const upload = multer(uploadConfig.multer);

complaintRouter.post(
  '/',
  upload.array('photos'),
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      positionLat: Joi.number().precision(10).required(),
      positionLng: Joi.number().precision(11).required(),
    },
  }),
  complaintController.create,
);

complaintRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  complaintController.listMy,
);

export { complaintRouter };
