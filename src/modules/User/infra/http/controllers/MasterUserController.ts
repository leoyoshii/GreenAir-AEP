import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/User/services/CreateUserService';

import { FindAllUserService } from '@modules/User/services/FindAllUserService';
import { AddFriendshipService } from '@modules/User/services/AddFriendService';
import { GetAllFriendsService } from '@modules/User/services/GetAllFriendsService';
import { classToPlain } from 'class-transformer';

export class MasterUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      gender,
      otherGender,
    } = request.body;

    const createUserContainer = container.resolve(CreateUserService);

    const user = await createUserContainer.execute({
      name,
      email,
      password,
      confirmPassword,
      role,
      gender,
      otherGender,
    });

    return response.status(201).json({ user });
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page, pageSize } = request.query;
    const findAllUserContainer = container.resolve(FindAllUserService);

    const [users, total] = await findAllUserContainer.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return response.status(201).json({ users: classToPlain(users), total });
  }
}
