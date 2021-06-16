import { inject, injectable } from 'tsyringe';
import { ICreatePostReactionsDto } from '../dtos/ICreatePostReactionsDto';
import { PostReactions } from '../infra/typeorm/entities/PostReactios';
import { IPostReactionsRepository } from '../interfaces/IPostReactionsRepository';

@injectable()
export class CreateAReactionService {
  constructor(
    @inject('PostReactionsRepository')
    private postReactionsRepository: IPostReactionsRepository,
  ) {}

  public async execute({
    comment,
    favorite,
    like,
    postId,
    userId,
  }: ICreatePostReactionsDto): Promise<PostReactions> {
    const reaction = await this.postReactionsRepository.checkExists({
      postId,
      userId,
    });

    if (!reaction) {
      return this.postReactionsRepository.create({
        comment,
        favorite,
        like,
        postId,
        userId,
      });
    } else {
      reaction.comment = comment;
      reaction.favorite = favorite;
      reaction.like = like;

      return this.postReactionsRepository.save(reaction);
    }
  }
}
