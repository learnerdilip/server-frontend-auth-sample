import {
  IsEmail,
  Length,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsUrl,
} from 'class-validator';

import { User, userRoles } from './entities/user.entity';

@ValidatorConstraint({ name: 'customPassword', async: false })
class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const regex = /\d+/;
    return value && value.match(regex);
  }

  defaultMessage(args: ValidationArguments) {
    return `The ${args.property} must contain at least contains 1 number`;
  }
}

export class CreateUserDto {
  @IsString()
  @Length(2, 25)
  firstName: string;

  @IsString()
  @Length(2, 25)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(6, 50)
  @Validate(CustomPasswordValidator)
  password: string;

  @IsOptional()
  @IsEnum(userRoles)
  role?: userRoles;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class CreateClientDto extends CreateUserDto {
  @IsUrl()
  @IsOptional()
  avatar?: string;
}

export class CreatePhotoDto {
  name?: string;

  @IsUrl()
  url: string;

  user?: User;
}
