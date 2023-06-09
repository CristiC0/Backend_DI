import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class ShowTeacherDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public userId: string;

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
  @IsArray()
  public title: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public phone: string;

  @ApiProperty()
  @IsArray()
  public courses: Course[];
}
