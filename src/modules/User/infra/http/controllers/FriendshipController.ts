import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AddFriendshipService } from '@modules/User/services/AddFriendService';
import { ListAllFriendshipService } from '@modules/User/services/ListAllFriendshipService';
import { EnumStatusFriendship } from '@modules/User/interfaces/EnumStatusFriendship';
import { EnumFindType } from '@modules/User/dtos/IFindAllFriendshipFilterDto';
import { UpdateStatusFriendshipService } from '@modules/User/services/UpdateStatusFriendshipService';

export class FriendshipController {
  public async addfriend(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { requestedId } = request.body;

    const addFriendshipContainer = container.resolve(AddFriendshipService);

    const friend = await addFriendshipContainer.execute({
      requesterId: id,
      requestedId,
    });

    return response.status(201).json({ friend });
  }

  public async listFriendships(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { page, pageSize, status, orderName, order, findType } =
      request.query;

    const listAllFriendshipContainer = container.resolve(
      ListAllFriendshipService,
    );

    const enumStatus: EnumStatusFriendship = (<any>EnumStatusFriendship)[
      String(status)
    ];
    const enumFindType: EnumFindType = (<any>EnumFindType)[String(findType)];

    const [friendships, total] = await listAllFriendshipContainer.execute({
      userId: id,
      page: Number(page),
      pageSize: Number(pageSize),
      ...(order && orderName
        ? { order: String(order), orderName: String(orderName) }
        : {}),
      ...(status ? { status: enumStatus } : {}),
      findType: enumFindType,
    });

    return response.status(201).json({ friendships, total });
  }

  public async updateFriendship(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { friendshipId } = request.params;
    const { status } = request.body;

    const enumStatus: EnumStatusFriendship = (<any>EnumStatusFriendship)[
      String(status)
    ];

    const updateStatusFriendshipContainer = container.resolve(
      UpdateStatusFriendshipService,
    );

    const friendship = await updateStatusFriendshipContainer.execute({
      friendshipId,
      status: enumStatus,
    });

    return response.status(201).json({ friendship });
  }
}
