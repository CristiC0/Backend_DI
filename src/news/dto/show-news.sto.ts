import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ShowNewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public authorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public priority: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public thumbnail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public createdAt: string;
}
