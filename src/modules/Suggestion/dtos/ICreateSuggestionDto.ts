import { SuggestionPhoto } from '../infra/typeorm/entities/SuggestionPhoto';

export interface ICreateSuggestionDto {
  requesterId: string;
  positionLat: number;
  positionLng: number;
  description: string;
  postId?: string;
  photos?: SuggestionPhoto[];
}
