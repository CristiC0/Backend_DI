import {
  IsString,
  IsNotEmpty,
  IsJSON,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public thumbnail: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Priority should be minimum 1' })
  @Max(13, { message: 'Priority should be maximum 3' })
  public priority: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  public content: string;
}
