import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from './userDto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RegisteredClientDto } from './registeredClientDto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // any files uploaded will be available in the request object
  // extracted by the Multer module AnyFilesInterceptor and passed
  // to the controller after validation
  @Post('register')
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          req.fileValidationError = 'Only image files are allowed!';
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createClient(
    @Body() registerData: CreateUserDto,
    @UploadedFiles() photofiles: Express.Multer.File[],
  ): Promise<{
    message: string;
  }> {
    const avatarFile = photofiles.find((file) => file.fieldname === 'avatar');
    const profilePhotoFiles = photofiles.filter(
      (file) => file.fieldname === 'profilephotos',
    );

    if (profilePhotoFiles.length < 4) {
      throw new HttpException(
        {
          message: 'Please upload 4 or more images at once',
          detail: 'At least 4 images are required to register',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.createClientWithPhotos({
      clientData: registerData,
      profilePics: profilePhotoFiles,
      avatar: avatarFile,
    });

    return { message: 'User registered successfully' };
  }

  @Get('users/me')
  @UseGuards(AuthGuard)
  async getUser(@Request() req): Promise<RegisteredClientDto> {
    const meDetails = await this.userService.findOne(req.user.username);

    const registeredClientDto: RegisteredClientDto = {
      id: meDetails.id,
      email: meDetails.email,
      avatar: meDetails.avatar,
      profilePhotos: meDetails.photos.map((photo) => photo.url),
      role: meDetails.role,
      fullName: meDetails.firstName + ' ' + meDetails.lastName,
      active: meDetails.active,
    };

    return registeredClientDto;
  }
}
