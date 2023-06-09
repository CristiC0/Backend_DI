import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Id of user',
  })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getUser(@Param() params: { id: string }) {
    return this.usersService.getUser(params.id);
  }

  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Id of user',
  })
  @ApiResponse({ status: 200, description: 'User updated!' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateUser(@Param() params: { id: string }, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(params.id, dto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Id of user',
  })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param() params: { id: string }) {
    return this.usersService.deleteUser(params.id);
  }
}
