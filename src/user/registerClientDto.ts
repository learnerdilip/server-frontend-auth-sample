export class RegisterClientDto {
  email: string;

  active: boolean;

  firstName: string;

  lastName: string;

  photos: PhotoDto[];

  role: string;

  avatar: string;

  fullName: string;
}

class PhotoDto {
  url: string;

  name: string;
}
