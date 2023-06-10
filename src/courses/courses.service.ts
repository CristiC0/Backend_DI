import { Injectable, Logger } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CoursesService {
  logger = new Logger(CoursesService.name);
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.prisma.course.create({
      data: {
        ...createCourseDto,
        teachers: {},
      },
    });
    createCourseDto.teachers?.map(async (teacherId) => {
      await this.prisma.teacherCourse.create({
        data: {
          teacher: {
            connect: {
              id: (
                await this.prisma.teacher.findUnique({
                  where: { id: teacherId },
                })
              ).id,
            },
          },
          course: { connect: { id: course.id } },
        },
      });
    });

    return { message: 'Course created' };
  }

  async findAll() {
    (await this.prisma.course.findMany()).forEach(async (course) => {
      // if (!course.description || !course.content)
      await this.prisma.course.update({
        where: { id: course.id },
        data: {
          description: '	Short descrition about course...',
          content: 'Main content of what the course entails...',
        },
      });
    });
    return await this.prisma.course.findMany({
      include: { teachers: { select: { teacher: true } } },
    });
  }

  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: { id },
      include: { teachers: { select: { teacher: true } } },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const teachers = updateCourseDto?.teachers
      ? updateCourseDto.teachers
      : (
          await this.prisma.teacherCourse.findMany({ where: { courseId: id } })
        ).map((teacher) => teacher.teacherId);
    delete updateCourseDto.teachers;

    await this.prisma.course.update({
      where: { id },
      data: { ...updateCourseDto, teachers: {} },
    });

    if (teachers && teachers.length !== 0) {
      await this.prisma.teacherCourse.deleteMany({
        where: { courseId: id },
      });
      teachers.forEach(
        async (teacherId) =>
          await this.prisma.teacherCourse.create({
            data: { courseId: id, teacherId },
          }),
      );
    }
    return { message: 'Updated Course!' };
  }

  async remove(id: string) {
    await this.prisma.teacherCourse.deleteMany({
      where: {
        courseId: (await this.prisma.course.findUnique({ where: { id } })).id,
      },
    });
    await this.prisma.course.delete({
      where: { id },
    });
    return { message: 'Course deleted!' };
  }
}
