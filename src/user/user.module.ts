import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Photo } from './entities/photo.entity';
import { User } from './entities/user.entity';
import S3Service from 'src/services/aws_s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Photo, User])],
  controllers: [UserController],
  providers: [UserService, S3Service],
  exports: [UserService],
})
export class UserModule {}
