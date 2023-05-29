import { Injectable, Logger } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class ScheduleService {
  logger = new Logger(ScheduleService.name);
  constructor(private prisma: PrismaService) {}
  async create(createScheduleDto: CreateScheduleDto) {
    await this.prisma.orar.create({
      data: {
        ...createScheduleDto,
      },
    });
    return { message: 'Schedule entry created' };
  }

  async findAllGroupInfo() {
    const groups = await this.prisma.group.findMany();
    return groups;
  }

  async findTimeIntervals() {
    const times = new Set(
      (
        await this.prisma.orar.findMany({
          select: { time: true },
        })
      ).map((query) => query.time),
    );
    return [...times].sort((entryA, entryB) => {
      return parseInt(entryA.split(':')[0]) > parseInt(entryB.split(':')[0])
        ? 1
        : -1;
    });
  }

  async findGroupSchedule(groupId: string) {
    const schedule = await this.prisma.orar.findMany({
      where: {
        group: await this.prisma.group.findUnique({
          where: { id: groupId },
        }),
      },
      include: { course: { select: { name: true, acronym: true } } },
    });
    return schedule.reduce(
      (schedule, entry) => {
        schedule[entry.day - 1].push(entry);
        return schedule;
      },
      [[], [], [], [], [], [], []].map((dayEntries) =>
        dayEntries.sort((entryA, entryB) => {
          return parseInt(entryA.time.split(':')[0]) >
            parseInt(entryB.time.split(':')[0])
            ? 1
            : -1;
        }),
      ),
    );
  }

  async findAll() {
    const schedule = await this.prisma.orar.findMany();
    return schedule;
  }

  async deleteEntriesWithTime(id: string, time: string) {
    await this.prisma.orar.deleteMany({ where: { groupId: id, time: time } });

    return { message: `Deleted entries for group where time ${time}` };
  }

  async findOne(id: string) {
    return await this.prisma.orar.findUnique({ where: { id } });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    await this.prisma.orar.update({ data: updateScheduleDto, where: { id } });
    return { message: 'Schedule updated' };
  }

  async remove(id: string) {
    await this.prisma.orar.delete({ where: { id } });
    return { message: 'Schedule entry deleted' };
  }
}
