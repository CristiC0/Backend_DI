import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ShowGroupDto } from './dto/show-group.dto';

@Controller('groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'Created group',
    type: [CreateGroupDto],
  })
  @Post()
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Return all teachers',
    type: [ShowGroupDto],
  })
  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Return all teachers',
    type: ShowGroupDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Update info of the group with respective id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Group deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
