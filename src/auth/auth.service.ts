import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDTO) {
    const { email, password, lastName, firstName, username } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser !== null)
      throw new BadRequestException('User with this email already exists');

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: { email, lastName, firstName, username, hashedPassword },
    });
    return { message: 'Everything is good!' };
  }

  async login(dto: LoginDTO, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (foundUser === null)
      throw new BadRequestException('No user with this email');

    const isCorrectPassword = await this.checkPassword({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!isCorrectPassword) throw new BadRequestException('Wrong password');

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      roles: foundUser.roles,
    });

    if (!token) throw new ForbiddenException();
    res.cookie('token', token);

    return res.send({ message: 'Log in succesful!', token });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Log out succesful!' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async checkPassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: {
    id: string;
    username: string;
    email: string;
    roles: string;
  }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
