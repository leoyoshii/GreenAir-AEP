import { IHashProvider } from '@shared/container/providers/HashProvider/interface/IHashProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/interface/IStorageProvider';
import { AppErrors } from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { EnumUserGender } from '../interfaces/EnumUserGender';
import { IUserRepository } from '../interfaces/IUserRepository';

interface IUpdateProfileUserDto {
  userId: string;
  areaCodePhone: string;
  avatarFilename: string;
  biografy: string;
  city: string;
  confirmPassword: string;
  gender: EnumUserGender;
  name: string;
  otherGender: string;
  password: string;
  phone: string;
  state: string;
}

@injectable()
export class UpdateProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider') private hashProvider: IHashProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    userId,
    areaCodePhone,
    avatarFilename,
    biografy,
    city,
    confirmPassword,
    gender,
    name,
    otherGender,
    password,
    phone,
    state,
  }: IUpdateProfileUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppErrors('User not found', 404);
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        throw new AppErrors('Passwords are not the same', 400);
      }

      user.password = await this.hashProvider.generateHash(password);
    } else if (
      (password && !confirmPassword) ||
      (!password && confirmPassword)
    ) {
      throw new AppErrors('Passwords are not the same', 400);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);
    user.avatar = filename;

    user.areaCodePhone = areaCodePhone;
    user.biografy = biografy;
    user.city = city;
    user.gender = gender;
    user.name = name;
    user.otherGender = otherGender;
    user.phone = phone;
    user.state = state;

    return this.userRepository.save(user);
  }
}
