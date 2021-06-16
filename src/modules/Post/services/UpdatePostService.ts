import IStorageProvider from '@shared/container/providers/StorageProvider/interface/IStorageProvider';
import { AppErrors } from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { Post } from '../infra/typeorm/entities/Post';
import { IPostPhotoRepository } from '../interfaces/IPostPhotoRepository';
import { IPostRepository } from '../interfaces/IPostRepository';

interface IUpdatePostServiceDto {
  postId: string;
  text: string;
  title: string;
  photos: string[];
}

@injectable()
export class UpdatePostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,

    @inject('PostPhotoRepository')
    private postPhotoRepository: IPostPhotoRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    text,
    title,
    photos,
    postId,
  }: IUpdatePostServiceDto): Promise<Post> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new AppErrors('Post not found', 404);
    }

    post.text = text;
    post.title = title;

    await Promise.all(
      photos.map(async item => {
        const photoFilename = await this.storageProvider.saveFile(item);

        const postPhoto = await this.postPhotoRepository.create({
          postId: post.id,
          photoFilename,
        });

        post.photos.push(postPhoto);
      }),
    );

    return this.postRepository.save(post);
  }
}
