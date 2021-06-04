import { inject, injectable } from 'tsyringe';
import { ICreateUserDto } from '../dtos/ICreateUserDto';
import { User } from '../infra/typeorm/entities/Users';
import { IUserRepository } from '../IRepositories/IUserRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: ICreateUserDto): Promise<User> {
    const { name } = data;

    const user = await this.userRepository.create({
      name,
    });

    return user;
  }
}
