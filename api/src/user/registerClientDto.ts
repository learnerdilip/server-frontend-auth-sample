import { IsBoolean, IsString, IsUrl } from 'class-validator';

export class RegisterClientDto {
  @IsString()
  email: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  photos: PhotoDto[];

  @IsString()
  role: string;

  @IsUrl()
  avatar: string;

  @IsString()
  fullName: string;
}

class PhotoDto {
  @IsUrl()
  url: string;

  @IsString()
  name: string;
}
