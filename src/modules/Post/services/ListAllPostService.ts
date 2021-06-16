import { inject, injectable } from 'tsyringe';
import { IFindAllPostFilterDto } from '../dtos/IFindAllPostFilterDto';
import { Post } from '../infra/typeorm/entities/Post';
import { IPostRepository } from '../interfaces/IPostRepository';

@injectable()
export class ListAllPostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    findType,
    page,
    pageSize,
    ownersIds,
    order,
    orderName,
  }: IFindAllPostFilterDto): Promise<[Post[], number]> {
    const [posts, total] = await this.postRepository.findAll({
      page,
      findType,
      pageSize,
      ownersIds,
      order,
      orderName,
    });

    return [posts, total];
  }
}
