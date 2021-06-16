import { ICreatePostPhotoDto } from '../dtos/ICreatePostPhotoDto';
import { PostPhoto } from '../infra/typeorm/entities/PostPhoto';

export interface IPostPhotoRepository {
  create(data: ICreatePostPhotoDto): Promise<PostPhoto>;
  findById(id: string): Promise<PostPhoto | undefined>;
  save(data: PostPhoto): Promise<PostPhoto>;
}
