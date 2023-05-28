import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create-teacher.dto';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
const nameRegex = /^[\w- ]*$/;

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(nameRegex, {
    message: 'Only letters. Spaces and hythens are accepted',
  })
  @Length(3, 16, { message: 'Between 3 and 16 characters' })
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(nameRegex, {
    message: 'Only letters. Spaces and hythens are accepted',
  })
  @Length(3, 16, { message: 'Between 3 and 16 characters' })
  public lastName: string;
}
