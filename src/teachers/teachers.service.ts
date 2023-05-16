import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.enum';
@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}
  logger = new Logger();

  async create(createTeacherDto: CreateTeacherDto) {
    let user: User;
    if (!createTeacherDto.userId) {
      user = await this.prisma.user.create({
        data: {
          email: null,
          lastName: createTeacherDto.lastName,
          firstName: createTeacherDto.firstName,
          username: null,
          hashedPassword: null,
          role: Role.TEACHER,
        },
      });
      delete createTeacherDto.lastName;
      delete createTeacherDto.firstName;
    }

    const createdTeacher = await this.prisma.teacher.create({
      data: {
        userId: user.id,
        ...createTeacherDto,
        courses: {
          create: createTeacherDto.courses.reduce((createCourses, id) => {
            return [...createCourses, { course: { connect: { id } } }];
          }, []),
        },
      },
    });

    await this.prisma.teacher.update({
      where: { id: createdTeacher.id },
      data: { user: { connect: { id: user.id } } },
    });
    return { message: 'Teacher created' };
  }

  async findAll() {
    return await this.prisma.teacher
      .findMany({
        include: {
          courses: { select: { course: true } },
          user: { select: { username: true, lastName: true, firstName: true } },
        },
      })
      .then((teachers) => this.formatTeacherList(teachers));
  }

  async findAllManagement(query: string) {
    let managementQuery;
    if (query === 'true') managementQuery = true;
    else if (query === 'false') managementQuery = false;
    else
      throw new BadRequestException(
        'Management should be either true or false',
      );
    return await this.prisma.teacher
      .findMany({
        where: { management: managementQuery },
        include: {
          courses: { select: { course: true } },
          user: { select: { username: true, lastName: true, firstName: true } },
        },
      })
      .then((teachers) => this.formatTeacherList(teachers));
  }

  async findOne(id: string) {
    return await this.prisma.teacher
      .findUnique({
        where: { id },
        include: {
          courses: { select: { course: { select: { name: true } } } },
          user: { select: { username: true, lastName: true, firstName: true } },
        },
      })
      .then((teacher) => {
        {
          if (!teacher)
            throw new NotFoundException('No teacher with such an id');
          return this.formatTeacher(teacher);
        }
      });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    if (updateTeacherDto.hasOwnProperty('courses'))
      this.deleteAllCoursesConnections(id);

    await this.prisma.teacher.update({
      where: { id },
      data: {
        ...updateTeacherDto,
        courses: {
          create: updateTeacherDto.courses?.reduce((createCourses, id) => {
            return [...createCourses, { course: { connect: { id } } }];
          }, []),
        },
      },
    });
    return { message: 'Teacher updated!' };
  }

  async remove(id: string) {
    await this.deleteAllCoursesConnections(id);
    await this.prisma.teacher.delete({ where: { id } });
    return { message: 'Teacher deleted!' };
  }

  formatTeacher(teacher: any) {
    return {
      ...teacher,
      username: teacher.user.username,
      courses: teacher.courses.reduce(
        (courses, course) => [...courses, course.course],
        [],
      ),
    };
  }

  formatTeacherList(teachers: any) {
    return teachers.map((teacher) => {
      const obj = {
        ...teacher,
        username: teacher.user.username,
        courses: teacher.courses.reduce(
          (courses, course) => [...courses, course.course],
          [],
        ),
      };
      delete obj.user;
      return obj;
    });
  }

  async deleteAllCoursesConnections(id: string) {
    const courses = await this.prisma.course.findMany({
      select: { id: true },
    });
    await this.prisma.teacherCourse.deleteMany({
      where: {
        teacherId: id,
        courseId: { in: courses.map((course) => course.id) },
      },
    });
  }
}
