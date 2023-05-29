import { IsArray, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

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
  @IsArray()
  public speciality: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  public links: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  public teachers: string[];
}
