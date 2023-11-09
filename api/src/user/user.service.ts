import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './entities/photo.entity';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './userDto';
import S3Service from 'src/services/aws_s3.service';
import { userRoles } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private s3Service: S3Service,
  ) {}

  async createClientWithPhotos({
    clientData,
    profilePics,
    avatar,
  }: {
    clientData: CreateClientDto;
    profilePics: Express.Multer.File[];
    avatar?: Express.Multer.File;
  }) {
    try {
      const user = new Client();
      user.email = clientData.email;
      user.active = clientData.active || true;
      user.firstName = clientData.firstName;
      user.lastName = clientData.lastName;
      user.password = clientData.password;
      user.role = clientData.role ?? userRoles.GUEST; // default to guest
      user.photos = await this.createPhotoRecords(profilePics, user);

      if (avatar) {
        user.avatar = await this.getS3UrlForUpload(avatar);
      }

      return await this.clientRepository.save(user);
    } catch (error) {
      throw new HttpException(
        { message: error.message, detail: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPhotoRecords(fileList: Express.Multer.File[], user: Client) {
    return await Promise.all(
      fileList.map(async (file) => {
        const photo = new Photo();
        photo.url = await this.getS3UrlForUpload(file);
        photo.name = file.originalname;
        photo.user = user;
        return photo;
      }),
    );
  }

  async getS3UrlForUpload(file: Express.Multer.File) {
    return await this.s3Service.uploadFile(file);
  }

  async findOne(email: string): Promise<Client> {
    try {
      const user = await this.clientRepository.findOne({
        where: { email },
        relations: ['photos'],
      });

      if (!user) {
        throw new HttpException(
          {
            message: 'no user with this email',
            detail: `no user with ${email}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          detail: error.details,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
