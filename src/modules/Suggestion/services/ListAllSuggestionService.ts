import { inject, injectable } from 'tsyringe';
import { IFindAllSuggestionFilterDto } from '../dtos/IFindAllSuggestionFilterDto';
import { Suggestion } from '../infra/typeorm/entities/Suggestion';
import { ISuggestionRepository } from '../interfaces/ISuggestionRepository';

@injectable()
export class ListAllSuggestionService {
  constructor(
    @inject('SuggestionRepository')
    private suggestionRepository: ISuggestionRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    userId,
  }: IFindAllSuggestionFilterDto): Promise<[Suggestion[], number]> {
    const [posts, total] = await this.suggestionRepository.findAll({
      page,
      pageSize,
      userId,
    });

    return [posts, total];
  }
}
