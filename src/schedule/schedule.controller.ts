import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { group, time } from 'console';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('groups')
  findAllGroupInfo() {
    return this.scheduleService.findAllGroupInfo();
  }

  @Get('time')
  findTimeIntervals() {
    return this.scheduleService.findTimeIntervals();
  }

  @Get('group/:groupId')
  findGroupSchedule(@Param('groupId') groupId: string) {
    return this.scheduleService.findGroupSchedule(groupId);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }

  @Delete(':id/:time')
  deleteEntriesWithTime(@Param('id') id: string, @Param('time') time: string) {
    return this.scheduleService.deleteEntriesWithTime(id, time);
  }
}
