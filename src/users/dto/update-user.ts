import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user';

export class UpdateUserDto extends PartialType(CreateUserDTO) {}
