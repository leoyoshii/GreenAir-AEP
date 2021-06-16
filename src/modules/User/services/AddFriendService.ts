import { AppErrors } from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ICreateFriendDTO } from '../dtos/ICreateFriendDTO';
import { Friendship } from '../infra/typeorm/entities/Friendship';
import { IFriendshipRepository } from '../interfaces/IFriendshipRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class AddFriendshipService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  public async execute(data: ICreateFriendDTO): Promise<Friendship> {
    const { requestedId, requesterId } = data;

    //verificação pra não ter duplicidade no Banco --> Se a friendship tiver sido declined é possivel criar outro, Bloqued Não.
    const checkExists = await this.friendshipRepository.checkExist({
      requesterId,
      requestedId,
    });

    if (checkExists) {
      throw new AppErrors('This Friendship relation already exists', 400);
    }

    const friend = await this.friendshipRepository.create({
      requestedId,
      requesterId,
    });

    return friend;
  }
}
