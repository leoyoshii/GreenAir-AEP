import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../IRepositories/IUserRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('erro');
    }

    return user;
  }
}
