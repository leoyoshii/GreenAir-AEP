import { container } from 'tsyringe';

import { UserRepository } from '@modules/User/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/User/IRepositories/IUserRepository';
import { FriendshipRepository } from '@modules/User/infra/typeorm/repositories/FriendshipRepository';
import { IFriendshipRepository } from '@modules/User/IRepositories/IFriendshipRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IFriendshipRepository>(
  'FriendshipRepository',
  FriendshipRepository,
);
