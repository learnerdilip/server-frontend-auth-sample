import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authservice.signIn(signInDto.email, signInDto.password);
  }
}
