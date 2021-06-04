import { inject, injectable } from 'tsyringe';
import { ICreateFriendDTO } from '../dtos/ICreateFriendDTO';
import { Friendship } from '../infra/typeorm/entities/Friendship';
import { IFriendshipRepository } from '../IRepositories/IFriendshipRepository';
import { IUserRepository } from '../IRepositories/IUserRepository';

@injectable()
export default class AddFriendshipService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  public async execute(data: ICreateFriendDTO): Promise<Friendship> {
    const { requestedId, requesterId } = data;

    const friend = await this.friendshipRepository.create({
      requestedId,
      requesterId,
    });

    return friend;
  }
}
