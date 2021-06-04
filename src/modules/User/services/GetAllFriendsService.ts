import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IFriendshipRepository } from '../IRepositories/IFriendshipRepository';
import { IUserRepository } from '../IRepositories/IUserRepository';

@injectable()
export default class GetAllFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User[]> {
    const users = await this.friendshipRepository.findAll(id);

    let friends: User[] = [];
    await Promise.all(
      users.map(async item => {
        if (item.requesterId === id) {
          const friend = await this.userRepository.findOne(item.requestedId);
          if (friend) {
            friends.push(friend);
          }
        } else {
          const friend = await this.userRepository.findOne(item.requesterId);
          if (friend) {
            friends.push(friend);
          }
        }
      }),
    );

    return friends;
  }
}
