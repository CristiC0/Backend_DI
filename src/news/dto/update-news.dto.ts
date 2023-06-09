import { PartialType } from '@nestjs/swagger';
import { CreateNewsDto } from './create-news.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public authorId: string;
}
