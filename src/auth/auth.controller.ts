import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './loginDto';

@Controller('api')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email && !password) {
      throw new HttpException(
        { message: 'email and password are required' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.authservice.signIn(email, password);
  }
}
