import { ICreateUserDto } from '../dtos/ICreateUserDto';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  create(data: ICreateUserDto): Promise<User>;
  findOne(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  getFriends(userId: string): Promise<User[]>;
}
