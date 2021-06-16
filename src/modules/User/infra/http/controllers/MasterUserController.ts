import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/User/services/CreateUserService';

import { FindAllUserService } from '@modules/User/services/FindAllUserService';
import { AddFriendshipService } from '@modules/User/services/AddFriendService';
import { GetAllFriendsService } from '@modules/User/services/GetAllFriendsService';

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
    const findAllUserContainer = container.resolve(FindAllUserService);

    const users = await findAllUserContainer.execute();

    return response.status(201).json({ users });
  }

  public async addfriend(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { requesterId, requestedId } = request.body;

    const addFriendshipContainer = container.resolve(AddFriendshipService);

    const friend = await addFriendshipContainer.execute({
      requesterId,
      requestedId,
    });

    return response.status(201).json({ friend });
  }

  public async getfriends(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getAllFriendsContainer = container.resolve(GetAllFriendsService);

    const friends = await getAllFriendsContainer.execute(id);

    return response.status(201).json({ friends });
  }
}
