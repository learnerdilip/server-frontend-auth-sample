import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateClientDto } from './userDto';
import { Client } from './entities/client.entity';
import { UserService } from './user.service';
import { RegisterClientDto } from './registerClientDto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('file'))
  async createClient(
    @Body() registerData: CreateClientDto,
    @Request() req: any,
  ): Promise<RegisterClientDto> {
    const { files } = req;

    if (files.length < 4) {
      throw new HttpException(
        {
          message: 'Please upload 4 or more images at once',
          detail: 'At least 4 images are required to register',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const registeredUser = await this.userService.createClientWithPhotos({
      clientData: registerData,
      pics: files,
    });

    const responseDto = new RegisterClientDto();
    responseDto.active = registeredUser.active;
    responseDto.avatar = registeredUser.avatar;
    responseDto.email = registeredUser.email;
    responseDto.firstName = registeredUser.firstName;
    responseDto.fullName = `${registeredUser.firstName} ${registeredUser.lastName}`;
    responseDto.lastName = registeredUser.lastName;
    responseDto.role = registeredUser.role;

    return responseDto;
  }

  @Get('users/me')
  @UseGuards(AuthGuard)
  async getUser(@Request() req) {
    const meDetails = await this.userService.findOne(req.user.username);
    const { password, ...meDetailsWithourPassword } = meDetails;
    return meDetailsWithourPassword;
  }
}
