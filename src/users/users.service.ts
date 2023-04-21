import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
      },
    });
  }
}
