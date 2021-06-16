import { ICreateSuggestionPhotoDto } from '@modules/Suggestion/dtos/ICreateSuggestionPhotoDto';
import { ISuggestionPhotoRepository } from '@modules/Suggestion/interfaces/ISuggestionPhotoRepository';
import { getRepository, Repository } from 'typeorm';
import { SuggestionPhoto } from '../entities/SuggestionPhoto';

export class SuggestionPhotoRepository implements ISuggestionPhotoRepository {
  private ormRepository: Repository<SuggestionPhoto>;

  constructor() {
    this.ormRepository = getRepository(SuggestionPhoto);
  }
  public async create({
    suggestionId,
    photoFilename,
  }: ICreateSuggestionPhotoDto): Promise<SuggestionPhoto> {
    const photo = this.ormRepository.create({
      photo: photoFilename,
      suggestionId,
    });

    return this.ormRepository.save(photo);
  }
  public async findById(id: string): Promise<SuggestionPhoto | undefined> {
    const photo = this.ormRepository.findOne({
      where: { id },
    });

    return photo;
  }
  public async save(data: SuggestionPhoto): Promise<SuggestionPhoto> {
    return this.ormRepository.save(data);
  }
}
