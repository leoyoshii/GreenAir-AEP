import { inject, injectable } from 'tsyringe';
import { IFindAllUsersFilterDto } from '../dtos/IFindAllUsersFilterDto';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class FindAllUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    pageSize,
  }: IFindAllUsersFilterDto): Promise<[User[], number]> {
    const [users, total] = await this.userRepository.findAll({
      page,
      pageSize,
    });

    return [users, total];
  }
}
