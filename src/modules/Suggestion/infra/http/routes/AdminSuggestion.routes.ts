import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { SuggestionController } from '../controllers/SuggestionController';

const adminSuggestionRouter = Router();
const suggestionController = new SuggestionController();

adminSuggestionRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  suggestionController.listMy,
);

adminSuggestionRouter.put(
  '/:suggestionId',
  celebrate({
    [Segments.PARAMS]: {
      suggestionId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string()
        .valid('PENDING', 'DECLINED', 'INPROGRESS', 'CONCLUDED')
        .required(),
      statusReason: Joi.string().required(),
    },
  }),
  suggestionController.updateStatus,
);

export { adminSuggestionRouter };
