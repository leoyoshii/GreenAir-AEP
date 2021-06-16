import { ICreateUserDto } from '@modules/User/dtos/ICreateUserDto';
import { IUserRepository } from '@modules/User/interfaces/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findAll(): Promise<[User[], number]> {
    const [users, total] = await this.ormRepository.findAndCount();

    return [users, total];
  }

  public async create({
    name,
    email,
    password,
    gender,
    otherGender,
    role,
  }: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      gender,
      otherGender,
      role,
    });

    console.log(user);

    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    return user;
  }

  public async getFriends(userId: string): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
