import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

import { FindProfileUserService } from '@modules/User/services/FindProfileUserService';
import { UpdateProfileUserService } from '@modules/User/services/UpdateProfileUserService';
import { GetAllFriendsService } from '@modules/User/services/GetAllFriendsService';

export class CommonUserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findByIdContainer = container.resolve(FindProfileUserService);

    const user = await findByIdContainer.execute(id);

    return response.status(200).json({ user: classToPlain(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;
    const {
      areaCodePhone,
      biografy,
      city,
      confirmPassword,
      gender,
      name,
      otherGender,
      password,
      phone,
      state,
    } = request.body;

    const updateProfileUserContainer = container.resolve(
      UpdateProfileUserService,
    );

    const user = await updateProfileUserContainer.execute({
      userId: id,
      areaCodePhone,
      avatarFilename: filename,
      biografy,
      city,
      confirmPassword,
      gender,
      name,
      otherGender,
      password,
      phone,
      state,
    });

    return response.status(201).json({ user: classToPlain(user) });
  }

  public async getFriends(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;

    const getAllFriendsContainer = container.resolve(GetAllFriendsService);

    const friends = await getAllFriendsContainer.execute(id);

    return response.status(200).json({ friends: classToPlain(friends) });
  }
}
