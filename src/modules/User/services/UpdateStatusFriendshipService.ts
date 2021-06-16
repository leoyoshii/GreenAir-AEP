import { AppErrors } from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { Friendship } from '../infra/typeorm/entities/Friendship';
import { EnumStatusFriendship } from '../interfaces/EnumStatusFriendship';
import { IFriendshipRepository } from '../interfaces/IFriendshipRepository';

interface IUpdateStatusFriendshipDto {
  friendshipId: string;
  status: EnumStatusFriendship;
}

@injectable()
export class UpdateStatusFriendshipService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  public async execute({
    friendshipId,
    status,
  }: IUpdateStatusFriendshipDto): Promise<Friendship> {
    const friendship = await this.friendshipRepository.findById(friendshipId);

    if (!friendship) {
      throw new AppErrors('Friendship not found', 404);
    }

    friendship.status = status;

    const friendshipUpdated = await this.friendshipRepository.save(friendship);

    if (status === EnumStatusFriendship.DECLINED) {
      await this.friendshipRepository.delete(friendship.id);
    }

    return friendshipUpdated;
  }
}
