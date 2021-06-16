import IStorageProvider from '@shared/container/providers/StorageProvider/interface/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { ICreatePostDto } from '../dtos/ICreatePostDto';
import { Post } from '../infra/typeorm/entities/Post';
import { IPostPhotoRepository } from '../interfaces/IPostPhotoRepository';
import { IPostRepository } from '../interfaces/IPostRepository';

interface ICreatePostServiceDto extends ICreatePostDto {
  arrayPhotos: string[];
}

@injectable()
export class CreatePostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,

    @inject('PostPhotoRepository')
    private postPhotoRepository: IPostPhotoRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    ownerId,
    text,
    title,
    arrayPhotos,
  }: ICreatePostServiceDto): Promise<Post> {
    const post = await this.postRepository.create({
      ownerId,
      text,
      title,
      photos: [],
    });

    await Promise.all(
      arrayPhotos.map(async item => {
        const photoFilename = await this.storageProvider.saveFile(item);

        const postPhoto = await this.postPhotoRepository.create({
          postId: post.id,
          photoFilename,
        });

        post.photos.push(postPhoto);
      }),
    );
    return post;
  }
}
