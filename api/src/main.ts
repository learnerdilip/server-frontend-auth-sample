import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import 'dotenv/config'; // load .env variables

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // validation of DTOs
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
