import { inject, injectable } from 'tsyringe';
import { EnumFindType } from '../dtos/IFindAllFriendshipFilterDto';
import { User } from '../infra/typeorm/entities/User';
import { EnumStatusFriendship } from '../interfaces/EnumStatusFriendship';
import { IFriendshipRepository } from '../interfaces/IFriendshipRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class GetAllFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User[]> {
    const [users, _] = await this.friendshipRepository.findAll({
      findType: EnumFindType.ALL,
      page: 0,
      pageSize: 0,
      userId: id,
      status: EnumStatusFriendship.ACCEPTED,
    });

    let friends: User[] = [];
    await Promise.all(
      users.map(async item => {
        if (item.requesterId === id) {
          const friend = await this.userRepository.findById(item.requestedId);
          if (friend) {
            friends.push(friend);
          }
        } else {
          const friend = await this.userRepository.findById(item.requesterId);
          if (friend) {
            friends.push(friend);
          }
        }
      }),
    );

    return friends;
  }
}
