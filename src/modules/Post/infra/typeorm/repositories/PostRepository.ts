import { ICreatePostDto } from '@modules/Post/dtos/ICreatePostDto';
import {
  EnumFindPostType,
  IFindAllPostFilterDto,
} from '@modules/Post/dtos/IFindAllPostFilterDto';
import { IPostRepository } from '@modules/Post/interfaces/IPostRepository';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../entities/Post';

export class PostRepository implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({
    ownerId,
    text,
    title,
    photos,
  }: ICreatePostDto): Promise<Post> {
    const post = this.ormRepository.create({
      ownerId,
      text,
      title,
      photos,
    });

    return this.ormRepository.save(post);
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = this.ormRepository.findOne({
      where: { id },
    });

    return post;
  }

  public async save(data: Post): Promise<Post> {
    return this.ormRepository.save(data);
  }

  public async findAll({
    page,
    findType,
    ownersIds,
    pageSize,
    order,
    orderName,
  }: IFindAllPostFilterDto): Promise<[Post[], number]> {
    const query = await this.ormRepository.createQueryBuilder('posts');
    query.leftJoinAndSelect('posts.photos', 'photos');
    query.leftJoinAndSelect('posts.reactions', 'reactions');

    if (
      findType === EnumFindPostType.ONLYFRIENDS &&
      ownersIds &&
      ownersIds.length > 0
    ) {
      let stringarray: string[] = [];

      ownersIds.map(ownerId => {
        const string = `posts.ownerId ='${ownerId}'`;
        stringarray.push(string);
      });

      const stringToSearch = stringarray.join(' OR ');

      query.andWhere(stringToSearch);
    }

    if (order && orderName) {
      query.orderBy(`'posts.${orderName}': '${order}'`);
    } else {
      query.orderBy({
        'posts.createdAt': 'DESC',
      });
    }

    query.skip(page * pageSize);
    query.take(pageSize);

    const [posts, total] = await query.getManyAndCount();

    return [posts, total];
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
