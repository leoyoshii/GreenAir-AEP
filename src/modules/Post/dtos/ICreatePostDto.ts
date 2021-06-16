import { PostPhoto } from '../infra/typeorm/entities/PostPhoto';

export interface ICreatePostDto {
  ownerId: string;
  title: string;
  text: string;
  photos: PostPhoto[];
}
