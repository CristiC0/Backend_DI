import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowNewsDto } from './dto/show-news.sto';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'Created news',
    type: [ShowNewsDto],
  })
  @Post()
  create(@Body() createNewsDto: CreateNewsDto, @Req() request) {
    return this.newsService.create(createNewsDto, request);
  }

  @ApiResponse({
    status: 200,
    description: 'Return all teachers',
    type: [ShowNewsDto],
  })
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @ApiResponse({
    status: 200,
    type: ShowNewsDto,
    description: 'Return the news with specified id',
  })
  @ApiResponse({
    status: 404,
    type: ShowNewsDto,
    description: 'No news with such an id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Update info of the news with respective id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'News deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
