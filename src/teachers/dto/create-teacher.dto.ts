import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsJSON,
  IsOptional,
  IsEmail,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public biografy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @Matches(/[+0-9].$/, {
    message: 'Only numbers',
  })
  public phone: string;

  @ApiProperty()
  @IsJSON()
  public contacts: string;

  @ApiProperty()
  @IsArray()
  public courses: string[];
}
