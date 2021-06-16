import { ICreateSuggestionPhotoDto } from '../dtos/ICreateSuggestionPhotoDto';
import { SuggestionPhoto } from '../infra/typeorm/entities/SuggestionPhoto';

export interface ISuggestionPhotoRepository {
  create(data: ICreateSuggestionPhotoDto): Promise<SuggestionPhoto>;
  findById(id: string): Promise<SuggestionPhoto | undefined>;
  save(data: SuggestionPhoto): Promise<SuggestionPhoto>;
}
