import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ComplaintController } from '../controllers/ComplaintController';

const adminComplaintRouter = Router();
const complaintController = new ComplaintController();

adminComplaintRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  complaintController.listMy,
);

adminComplaintRouter.put(
  '/:complaintId',
  celebrate({
    [Segments.PARAMS]: {
      complaintId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string()
        .valid('PENDING', 'DECLINED', 'INPROGRESS', 'CONCLUDED')
        .required(),
      statusReason: Joi.string().required(),
    },
  }),
  complaintController.updateStatus,
);

export { adminComplaintRouter };
