import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class FindProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    return user;
  }
}
