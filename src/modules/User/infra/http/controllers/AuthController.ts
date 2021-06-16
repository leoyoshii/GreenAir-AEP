import auth from '@config/auth';
import { AuthenticateService } from '@modules/User/services/AuthenticateService';
import { CreateUserService } from '@modules/User/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateContainer = container.resolve(AuthenticateService);

    const { token, user } = await authenticateContainer.execute({
      email,
      password,
    });

    response.cookie('@GreenAir:presence', token, {
      httpOnly: true,
      maxAge: auth.jwt.expiresIn,
    });

    return response.status(201).json({ user });
  }

  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, confirmPassword, gender, otherGender } =
      request.body;

    const createUserContainer = container.resolve(CreateUserService);

    const user = await createUserContainer.execute({
      name,
      email,
      password,
      confirmPassword,
      gender,
      otherGender,
    });

    return response.status(201).json({ user });
  }
}
