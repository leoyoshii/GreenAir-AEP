import { inject, injectable } from 'tsyringe';
import { AppErrors } from '@shared/infra/errors/AppErrors';
import { ICreateUserDto } from '../dtos/ICreateUserDto';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/interface/IHashProvider';
import { EnumUserRole } from '../interfaces/EnumUserRole';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    confirmPassword,
    gender,
    otherGender,
    role,
  }: ICreateUserDto): Promise<User> {
    const checkEmailInUse = await this.userRepository.findByEmail(email);

    if (checkEmailInUse) {
      throw new AppErrors('Email em uso', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (password !== confirmPassword) {
      throw new AppErrors('As senhas estão diferentes', 400);
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      gender,
      otherGender,
      ...(role ? { role } : { role: EnumUserRole.API_COMMON }),
    });

    return user;
  }
}
