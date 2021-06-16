import { container } from 'tsyringe';
import './providers';

import { UserRepository } from '@modules/User/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/User/interfaces/IUserRepository';
import { FriendshipRepository } from '@modules/User/infra/typeorm/repositories/FriendshipRepository';
import { IFriendshipRepository } from '@modules/User/interfaces/IFriendshipRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IFriendshipRepository>(
  'FriendshipRepository',
  FriendshipRepository,
);
