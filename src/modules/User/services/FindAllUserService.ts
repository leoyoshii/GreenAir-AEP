import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class FindAllUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
