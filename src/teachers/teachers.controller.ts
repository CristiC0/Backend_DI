import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowTeacherDto } from './dto/show-teacher.dto';
@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'Create teacher',
  })
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teachersService.create(createTeacherDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Return all teachers',
    type: [ShowTeacherDto],
  })
  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Return all teacher based on management query(true/false)',
    type: [ShowTeacherDto],
  })
  @ApiResponse({
    status: 400,
    description: 'If management neither true or false',
  })
  @Get('filter?')
  findAllManagement(@Query('management') query: string) {
    return this.teachersService.findAllManagement(query);
  }

  @ApiResponse({
    status: 200,
    type: ShowTeacherDto,
    description: 'Return teacher with specified id',
  })
  @ApiResponse({
    status: 404,
    type: ShowTeacherDto,
    description: 'No teacher with such an id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Update info of teacher with respective id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Teacher deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
