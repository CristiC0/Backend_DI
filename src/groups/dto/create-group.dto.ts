import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsJSON,
  IsOptional,
  IsEmail,
  Matches,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  public year: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  public cycle: number;
}
