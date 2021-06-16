import { ICheckExistsPostReactionDto } from '@modules/Post/dtos/ICheckExistsPostReactionDto';
import { ICreatePostReactionsDto } from '@modules/Post/dtos/ICreatePostReactionsDto';
import { IPostReactionsRepository } from '@modules/Post/interfaces/IPostReactionsRepository';
import { getRepository, Repository } from 'typeorm';

import { PostReactions } from '../entities/PostReactios';

export class PostReactionsRepository implements IPostReactionsRepository {
  private ormRepository: Repository<PostReactions>;

  constructor() {
    this.ormRepository = getRepository(PostReactions);
  }

  public async checkExists({
    postId,
    userId,
  }: ICheckExistsPostReactionDto): Promise<PostReactions | undefined> {
    const reaction = this.ormRepository.findOne({
      where: { postId, userId },
    });

    return reaction;
  }
  public async create({
    comment,
    favorite,
    like,
    postId,
    userId,
  }: ICreatePostReactionsDto): Promise<PostReactions> {
    const reaction = this.ormRepository.create({
      comment,
      favorite,
      like,
      postId,
      userId,
    });

    return this.ormRepository.save(reaction);
  }

  public async findById(id: string): Promise<PostReactions | undefined> {
    const reaction = this.ormRepository.findOne({
      where: { id },
    });

    return reaction;
  }
  public async save(data: PostReactions): Promise<PostReactions> {
    return this.ormRepository.save(data);
  }
}
