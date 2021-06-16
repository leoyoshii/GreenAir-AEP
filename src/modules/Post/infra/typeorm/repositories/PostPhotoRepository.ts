import { ICreatePostPhotoDto } from '@modules/Post/dtos/ICreatePostPhotoDto';
import { IPostPhotoRepository } from '@modules/Post/interfaces/IPostPhotoRepository';
import { getRepository, Repository } from 'typeorm';
import { PostPhoto } from '../entities/PostPhoto';

export class PostPhotoRepository implements IPostPhotoRepository {
  private ormRepository: Repository<PostPhoto>;

  constructor() {
    this.ormRepository = getRepository(PostPhoto);
  }
  public async create({
    photoFilename,
    postId,
  }: ICreatePostPhotoDto): Promise<PostPhoto> {
    const photo = this.ormRepository.create({
      photo: photoFilename,
      postId,
    });

    return this.ormRepository.save(photo);
  }
  public async findById(id: string): Promise<PostPhoto | undefined> {
    const photo = this.ormRepository.findOne({
      where: { id },
    });

    return photo;
  }
  public async save(data: PostPhoto): Promise<PostPhoto> {
    return this.ormRepository.save(data);
  }
}
