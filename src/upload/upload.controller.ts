import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Uploads')
export class UploadController {
  @ApiResponse({
    status: 400,
    type: JSON.stringify({ imagePath: 'url' }),
  })
  @ApiResponse({
    status: 200,
    description:
      'When file not is bigger than 5MB or not in jpg,jpeg or png format ',
  })
  @Post('image/teachers')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files/images/teachers',
        filename: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            callback(
              new BadRequestException(
                'Accepted formats are only jpg,jpeg and png',
              ),
              null,
            );

          if (file.size > 5_000_000)
            callback(
              new BadRequestException('File has to be maximum 5MB'),
              null,
            );
          const filename = `${
            file.originalname.split('.')[0]
          }-${crypto.randomUUID()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadTeacherImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      imagePath: `http://localhost:3000/images/teachers/${file.filename}`,
    };
  }

  @ApiResponse({
    status: 400,
    type: JSON.stringify({ imagePath: 'url' }),
  })
  @ApiResponse({
    status: 200,
    description:
      'When file not is bigger than 5MB or not in jpg,jpeg or png format ',
  })
  @Post('image/news')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files/images/news',
        filename: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            callback(
              new BadRequestException(
                'Accepted formats are only jpg,jpeg and png',
              ),
              null,
            );

          if (file.size > 5_000_000)
            callback(
              new BadRequestException('File has to be maximum 5MB'),
              null,
            );
          const filename = `${
            file.originalname.split('.')[0]
          }-${crypto.randomUUID()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadNewsImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      imagePath: `http://localhost:3000/images/news/${file.filename}`,
    };
  }

  @ApiResponse({
    status: 400,
    type: JSON.stringify({ photo: 'url' }),
  })
  @ApiResponse({
    status: 200,
    description:
      'When file not is bigger than 5MB or not in jpg,jpeg or png format ',
  })
  @Post('image/courses')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files/images/courses',
        filename: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            callback(
              new BadRequestException(
                'Accepted formats are only jpg,jpeg and png',
              ),
              null,
            );

          if (file.size > 5_000_000)
            callback(
              new BadRequestException('File has to be maximum 5MB'),
              null,
            );
          const filename = `${
            file.originalname.split('.')[0]
          }-${crypto.randomUUID()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadCoursesImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      photo: `http://localhost:3000/courses/news/${file.filename}`,
    };
  }
}
