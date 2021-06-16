import { EnumUserGender } from '../interfaces/EnumUserGender';
import { EnumUserRole } from '../interfaces/EnumUserRole';

export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: EnumUserGender;
  otherGender: string;
  role?: EnumUserRole;
}
