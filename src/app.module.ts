import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/database.config';
import s3Service from './services/aws_s3.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [MulterModule.register(), TypeOrmModule.forRoot(config), UserModule],
  controllers: [AppController],
  providers: [AppService, s3Service],
  exports: [s3Service],
})
export class AppModule {}
