import { ICreateUserDto } from '../dtos/ICreateUserDto';
import { IFindAllUsersFilterDto } from '../dtos/IFindAllUsersFilterDto';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  create(data: Omit<ICreateUserDto, 'confirmPassword'>): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findAll(data: IFindAllUsersFilterDto): Promise<[User[], number]>;
  getFriends(userId: string): Promise<User[]>;
}
