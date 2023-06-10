import { Injectable, Logger } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GroupsService {
  logger = new Logger(GroupsService.name);
  constructor(private prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    await this.prisma.group.create({ data: createGroupDto });
    return { message: 'Group Created' };
  }

  async findAll() {
    return await this.prisma.group.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.group.findUnique({ where: { id } });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    this.logger.log(updateGroupDto);
    await this.prisma.group.update({ where: { id }, data: updateGroupDto });
    return { message: 'Group Updated' };
  }

  async remove(id: string) {
    await this.prisma.orar.deleteMany({ where: { groupId: id } });
    await this.prisma.group.delete({ where: { id } });
    return { message: 'Group Deleted' };
  }
}
