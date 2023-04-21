import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

const nameRegex = /^[\w- ]*$/;

const usernameRegex = /^[\w\d]*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(nameRegex, {
    message: 'Only letters. Spaces and hythens are accepted',
  })
  @Length(3, 16, { message: 'Between 3 and 16 characters' })
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(nameRegex, {
    message: 'Only letters. Spaces and hythens are accepted',
  })
  @Length(3, 16, { message: 'Between 3 and 16 characters' })
  public lastName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(usernameRegex, {
    message: 'Only letters and numbers',
  })
  @Length(3, 16, { message: 'Between 3 and 16 characters' })
  public username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 12, { message: 'Password must be between 5 and 12 characters' })
  @Matches(passwordRegex, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit',
  })
  public password: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 12, { message: 'Password must be between 5 and 12 characters' })
  @Matches(passwordRegex, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit',
  })
  public password: string;
}
