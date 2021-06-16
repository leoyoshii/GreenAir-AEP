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

import { ComplaintRepository } from '@modules/Complaint/infra/typeorm/repositories/ComplaintRepository';
import { IComplaintRepository } from '@modules/Complaint/interfaces/IComplaintRepository';
import { IComplaintPhotoRepository } from '@modules/Complaint/interfaces/IComplaintPhotoRepository';
import { ComplaintPhotoRepository } from '@modules/Complaint/infra/typeorm/repositories/ComplaintPhotoRepository';
import { ISuggestionRepository } from '@modules/Suggestion/interfaces/ISuggestionRepository';
import { ISuggestionPhotoRepository } from '@modules/Suggestion/interfaces/ISuggestionPhotoRepository';
import { SuggestionRepository } from '@modules/Suggestion/infra/typeorm/repositories/SuggestionRepository';
import { SuggestionPhotoRepository } from '@modules/Suggestion/infra/typeorm/repositories/SuggestionPhotoRepository';

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

container.registerSingleton<IComplaintRepository>(
  'ComplaintRepository',
  ComplaintRepository,
);

container.registerSingleton<IComplaintPhotoRepository>(
  'ComplaintPhotoRepository',
  ComplaintPhotoRepository,
);

container.registerSingleton<ISuggestionRepository>(
  'SuggestionRepository',
  SuggestionRepository,
);

container.registerSingleton<ISuggestionPhotoRepository>(
  'SuggestionPhotoRepository',
  SuggestionPhotoRepository,
);
