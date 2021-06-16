import IStorageProvider from '@shared/container/providers/StorageProvider/interface/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { ICreateSuggestionDto } from '../dtos/ICreateSuggestionDto';
import { Suggestion } from '../infra/typeorm/entities/Suggestion';
import { ISuggestionPhotoRepository } from '../interfaces/ISuggestionPhotoRepository';
import { ISuggestionRepository } from '../interfaces/ISuggestionRepository';

interface ICreateSuggestionServiceDto extends ICreateSuggestionDto {
  arrayPhotos: string[];
}

@injectable()
export class CreateSuggestionService {
  constructor(
    @inject('SuggestionRepository')
    private suggestionRepository: ISuggestionRepository,

    @inject('SuggestionPhotoRepository')
    private suggestionPhotoRepository: ISuggestionPhotoRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    description,
    positionLat,
    positionLng,
    requesterId,
    arrayPhotos,
  }: ICreateSuggestionServiceDto): Promise<Suggestion> {
    const suggestion = await this.suggestionRepository.create({
      description,
      positionLat,
      positionLng,
      requesterId,
      photos: [],
    });

    await Promise.all(
      arrayPhotos.map(async item => {
        const photoFilename = await this.storageProvider.saveFile(item);

        const suggestionPhoto = await this.suggestionPhotoRepository.create({
          suggestionId: suggestion.id,
          photoFilename,
        });

        suggestion.photos.push(suggestionPhoto);
      }),
    );

    return suggestion;
  }
}
