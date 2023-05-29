import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsNumber,
  Max,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/\d{2}:\d{2}-\d{2}:\d{2}$/, {
    message: 'The format should be: NN:NN-NN:NN where N=0-9',
  })
  public time: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Max(7, { message: 'Number between 1-7' })
  public day: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public groupId: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public courseId: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public teacherId: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public room: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Max(2)
  public week: number;
}
