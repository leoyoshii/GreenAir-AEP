import { inject, injectable } from 'tsyringe';
import { IFindAllFriendshipFilterDto } from '../dtos/IFindAllFriendshipFilterDto';
import { Friendship } from '../infra/typeorm/entities/Friendship';

import { IFriendshipRepository } from '../interfaces/IFriendshipRepository';

@injectable()
export class ListAllFriendshipService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    userId,
    findType,
    order,
    orderName,
    status,
  }: IFindAllFriendshipFilterDto): Promise<[Friendship[], number]> {
    const [friendships, total] = await this.friendshipRepository.findAll({
      page,
      pageSize,
      userId,
      findType,
      order,
      orderName,
      status,
    });

    return [friendships, total];
  }
}
