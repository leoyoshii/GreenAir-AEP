import { ICreateFriendDTO } from '../dtos/ICreateFriendDTO';
import { IFindAllFriendshipFilterDto } from '../dtos/IFindAllFriendshipFilterDto';
import { Friendship } from '../infra/typeorm/entities/Friendship';

export interface IFriendshipRepository {
  create(data: ICreateFriendDTO): Promise<Friendship>;
  findById(id: string): Promise<Friendship | undefined>;
  save(friendship: Friendship): Promise<Friendship>;
  findAll(data: IFindAllFriendshipFilterDto): Promise<[Friendship[], number]>;
  checkExist(
    data: ICheckExistsFriendshipFilterDto,
  ): Promise<Friendship | undefined>;
  delete(id: string): Promise<void>;
}
