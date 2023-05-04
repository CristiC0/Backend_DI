import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
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
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return { imagePath: join('images', 'teachers', file.originalname) };
  }
}
