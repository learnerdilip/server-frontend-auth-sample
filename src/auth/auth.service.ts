import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * returns the accesstoken for a authorized user
   * @param email {string}
   * @param pass {string}
   * @returns
   */
  async signIn(email: string, pass: string) {
    try {
      const user = await this.usersService.findOne(email);

      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, detail: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
