import { container } from 'tsyringe';
import './providers';

import { UserRepository } from '@modules/User/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/User/interfaces/IUserRepository';

import { FriendshipRepository } from '@modules/User/infra/typeorm/repositories/FriendshipRepository';
import { IFriendshipRepository } from '@modules/User/interfaces/IFriendshipRepository';

import { PostRepository } from '@modules/Post/infra/typeorm/repositories/PostRepository';
import { IPostRepository } from '@modules/Post/interfaces/IPostRepository';

import { PostPhotoRepository } from '@modules/Post/infra/typeorm/repositories/PostPhotoRepository';
import { IPostPhotoRepository } from '@modules/Post/interfaces/IPostPhotoRepository';

import { PostReactionsRepository } from '@modules/Post/infra/typeorm/repositories/PostReactionsRepository';
import { IPostReactionsRepository } from '@modules/Post/interfaces/IPostReactionsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IFriendshipRepository>(
  'FriendshipRepository',
  FriendshipRepository,
);
container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
container.registerSingleton<IPostPhotoRepository>(
  'PostPhotoRepository',
  PostPhotoRepository,
);
container.registerSingleton<IPostReactionsRepository>(
  'PostReactionsRepository',
  PostReactionsRepository,
);
