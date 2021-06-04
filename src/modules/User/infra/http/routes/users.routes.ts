import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const usersRouter = Router();
const userController = new UserController();

usersRouter.post('/', userController.create);
usersRouter.put('/solicitar', userController.addfriend);
usersRouter.get('/', userController.findAll);
usersRouter.get('/:id', userController.show);
usersRouter.get('/friends/:id', userController.getfriends);

export default usersRouter;
