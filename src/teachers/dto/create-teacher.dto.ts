import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;
  @IsNotEmpty()
  @IsString()
  public photo: string;
  @IsNotEmpty()
  @IsString()
  public description: string;
  @IsNotEmpty()
  @IsString()
  public biografy: string;
  @IsNotEmpty()
  @IsString()
  public title: string;
  @IsArray()
  @IsNotEmpty()
  public socials: string[];
  @IsNotEmpty()
  @IsString()
  public book: string;
  @IsNotEmpty()
  @IsString()
  public course: string;
}
