import { Injectable, Logger } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class TeachersService {
  private readonly logger = new Logger(TeachersService.name);
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    this.logger.log(createTeacherDto);
    await this.prisma.teacher.create({ data: createTeacherDto });
    return { message: 'Teacher created' };
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: string) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    await this.prisma.teacher.update({
      where: { id },
      data: { ...updateTeacherDto },
    });
    return { message: 'Teacher updated!' };
  }

  async remove(id: string) {
    await this.prisma.teacher.delete({ where: { id } });
    return { message: 'Teacher deleted!' };
  }
}
