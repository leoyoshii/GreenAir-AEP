import { AppErrors } from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { Suggestion } from '../infra/typeorm/entities/Suggestion';
import { EnumStatusSuggestion } from '../interfaces/EnumStatusSuggestion';
import { ISuggestionRepository } from '../interfaces/ISuggestionRepository';

interface IUpdateStatusSuggestionDto {
  suggestionId: string;
  status: EnumStatusSuggestion;
  statusReason: string;
}

@injectable()
export class UpdateStatusSuggestionService {
  constructor(
    @inject('SuggestionRepository')
    private suggestionRepository: ISuggestionRepository,
  ) {}

  public async execute({
    suggestionId,
    status,
    statusReason,
  }: IUpdateStatusSuggestionDto): Promise<Suggestion> {
    const suggestion = await this.suggestionRepository.findById(suggestionId);

    if (!suggestion) {
      throw new AppErrors('Suggestion not found', 404);
    }

    suggestion.status = status;
    suggestion.statusReason = statusReason;

    return this.suggestionRepository.save(suggestion);
  }
}
