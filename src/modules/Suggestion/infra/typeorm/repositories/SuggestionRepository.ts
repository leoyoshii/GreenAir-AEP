import { getRepository, Repository } from 'typeorm';
import { ISuggestionRepository } from '@modules/Suggestion/interfaces/ISuggestionRepository';
import { Suggestion } from '../entities/Suggestion';
import { ICreateSuggestionDto } from '@modules/Suggestion/dtos/ICreateSuggestionDto';
import { IFindAllSuggestionFilterDto } from '@modules/Suggestion/dtos/IFindAllSuggestionFilterDto';
import { EnumStatusSuggestion } from '@modules/Suggestion/interfaces/EnumStatusSuggestion';

export class SuggestionRepository implements ISuggestionRepository {
  private ormRepository: Repository<Suggestion>;

  constructor() {
    this.ormRepository = getRepository(Suggestion);
  }
  public async create({
    description,
    positionLat,
    positionLng,
    requesterId,
    photos,
  }: ICreateSuggestionDto): Promise<Suggestion> {
    const suggestion = this.ormRepository.create({
      description,
      positionLat,
      positionLng,
      requesterId,
      photos,
      status: EnumStatusSuggestion.PENDING,
    });
    return this.ormRepository.save(suggestion);
  }
  public async findById(id: string): Promise<Suggestion | undefined> {
    const suggestion = this.ormRepository.findOne({
      where: { id },
    });

    return suggestion;
  }
  public async save(data: Suggestion): Promise<Suggestion> {
    return this.ormRepository.save(data);
  }

  public async findAll({
    page,
    pageSize,
    userId,
  }: IFindAllSuggestionFilterDto): Promise<[Suggestion[], number]> {
    const [suggestions, total] = await this.ormRepository.findAndCount({
      where: {
        ...(userId ? { requesterId: userId } : {}),
      },
      skip: page * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return [suggestions, total];
  }
}
