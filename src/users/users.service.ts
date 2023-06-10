import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from 'src/auth/role.enum';
import { UpdateUserDto } from './dto/update-user';
import { AuthService } from 'src/auth/auth.service';
import { randomInt } from 'crypto';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    delete user.hashedPassword;
    return user;
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        lastName: true,
        firstName: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  async updateUser(id: string, body: UpdateUserDto) {
    if (body?.password) {
      const hashedPassword = await this.authService.hashPassword(body.password);
      delete body.password;
      await this.prisma.user.update({
        where: { id },
        data: { ...body, hashedPassword },
      });
    } else {
      await this.prisma.user.update({
        where: { id },
        data: { ...body },
      });
    }

    return { message: 'User updated!' };
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const teacher = await this.prisma.teacher.findUnique({
      where: { userId: user.id },
    });
    if (!user) throw new NotFoundException();

    if (teacher) {
      const newUser = await this.prisma.user.create({
        data: {
          email: null,
          lastName: user.lastName,
          firstName: user.firstName,
          username: null,
          hashedPassword: null,
          role: Role.TEACHER,
        },
      });

      await this.prisma.teacher.update({
        where: { userId: user.id },
        data: { user: { connect: { id: newUser.id } } },
      });
    }

    await this.prisma.user.update({
      where: { id },
      data: { teacher: undefined },
    }),
      await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted!' };
  }
}
