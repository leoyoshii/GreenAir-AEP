import { ICreateUserDto } from '@modules/User/dtos/ICreateUserDto';
import { IUserRepository } from '@modules/User/IRepositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { Friendship } from '../entities/Friendship';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  getFriends(userId: string): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  public async findOne(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async create(data: ICreateUserDto): Promise<User> {
    const { name } = data;

    const user = await this.ormRepository.create({
      name,
    });

    return this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
