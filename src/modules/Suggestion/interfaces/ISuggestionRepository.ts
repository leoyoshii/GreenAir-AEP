import { ICreateSuggestionDto } from '../dtos/ICreateSuggestionDto';
import { IFindAllSuggestionFilterDto } from '../dtos/IFindAllSuggestionFilterDto';
import { Suggestion } from '../infra/typeorm/entities/Suggestion';

export interface ISuggestionRepository {
  create(data: ICreateSuggestionDto): Promise<Suggestion>;
  findById(id: string): Promise<Suggestion | undefined>;
  save(data: Suggestion): Promise<Suggestion>;
  findAll(data: IFindAllSuggestionFilterDto): Promise<[Suggestion[], number]>;
}
