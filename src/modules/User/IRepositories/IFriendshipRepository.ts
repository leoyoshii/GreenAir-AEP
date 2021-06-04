import { ICreateFriendDTO } from '../dtos/ICreateFriendDTO';
import { Friendship } from '../infra/typeorm/entities/Friendship';

export interface IFriendshipRepository {
  create(data: ICreateFriendDTO): Promise<Friendship>;
  findOne(id: string): Promise<Friendship | undefined>;
  save(friendship: Friendship): Promise<Friendship>;
  findAll(userid: string): Promise<Friendship[]>;
}
