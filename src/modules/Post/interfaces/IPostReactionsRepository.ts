import { ICheckExistsPostReactionDto } from '../dtos/ICheckExistsPostReactionDto';
import { ICreatePostReactionsDto } from '../dtos/ICreatePostReactionsDto';
import { PostReactions } from '../infra/typeorm/entities/PostReactios';

export interface IPostReactionsRepository {
  create(data: ICreatePostReactionsDto): Promise<PostReactions>;
  checkExists(
    data: ICheckExistsPostReactionDto,
  ): Promise<PostReactions | undefined>;
  findById(id: string): Promise<PostReactions | undefined>;
  save(data: PostReactions): Promise<PostReactions>;
}
