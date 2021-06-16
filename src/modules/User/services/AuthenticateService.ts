import auth from '@config/auth';
import { IHashProvider } from '@shared/container/providers/HashProvider/interface/IHashProvider';
import { AppErrors } from '@shared/infra/errors/AppErrors';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import {
  IAuthenticateUserdto,
  IAuthenticateUserResponse,
} from '../dtos/IAuthenticateUserdto';

import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class AuthenticateService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserdto): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('User not found.', 404);
    }

    if (user.deletedAt) {
      throw new AppErrors('User disabled', 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppErrors('Email/password incorrect.', 400);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
