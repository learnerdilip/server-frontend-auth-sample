import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './entities/photo.entity';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './createUserDto';
import S3Service from 'src/services/aws_s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private s3Service: S3Service,
  ) {}

  async createClientWithPhotos({
    clientData,
    pics,
  }: {
    clientData: CreateClientDto;
    pics: Photo[];
  }) {
    try {
      const user = new Client();
      user.email = clientData.email;
      user.active = clientData.active || true;
      user.firstName = clientData.firstName;
      user.lastName = clientData.lastName;
      user.password = clientData.password;

      const getPhoto = pics.map(async (file: any) => {
        const photo = new Photo();
        photo.url = await this.getS3UrlForUpload(file);
        photo.name = file.originalname;
        photo.user = user;
        return photo;
      });

      const photoList = await Promise.all(getPhoto);

      user.photos = photoList;
      return await this.clientRepository.save(user);
    } catch (error) {
      throw new HttpException(
        { message: error.message, detail: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getS3UrlForUpload(file) {
    return await this.s3Service.uploadFile(file);
  }

  async findOne(email: string): Promise<Client> {
    return await this.clientRepository.findOne({ where: { email } });
  }
}
