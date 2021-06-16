import { ICreatePostDto } from '../dtos/ICreatePostDto';
import { IFindAllPostFilterDto } from '../dtos/IFindAllPostFilterDto';
import { Post } from '../infra/typeorm/entities/Post';

export interface IPostRepository {
  create(data: ICreatePostDto): Promise<Post>;
  findById(id: string): Promise<Post | undefined>;
  save(data: Post): Promise<Post>;
  findAll(data: IFindAllPostFilterDto): Promise<[Post[], number]>;
  delete(id: string): Promise<void>;
}
