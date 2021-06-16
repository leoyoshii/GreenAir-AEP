import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { EnumUserRole } from '@modules/User/interfaces/EnumUserRole';
import { AppErrors } from '@shared/infra/errors/AppErrors';
import { User } from '@modules/User/infra/typeorm/entities/User';

const ensureRoles = (roles: Array<EnumUserRole>) => {
  return async (
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> => {
    let user: User;
    const userRepository = getRepository(User);
    try {
      const { id } = request.user;

      user = await userRepository.findOneOrFail(id);

      if (roles.indexOf(user.role) > -1) {
        next();
      } else {
        throw new AppErrors('Your user does not have access to the role', 403);
      }
    } catch (err) {
      throw new AppErrors('Your user does not have access to the role', 403);
    }
  };
};

export default ensureRoles;
