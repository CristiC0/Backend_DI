import { ApiProperty } from '@nestjs/swagger';
export class RegisterData {
  @ApiProperty({ example: 'Ion', description: 'Prenumele utilizatorului' })
  public firstName: string;
  @ApiProperty({ example: 'Munteanu', description: 'Numele utilizatorului' })
  public lastName: string;
  @ApiProperty({ example: 'Ion', description: 'Numele de utilizator' })
  public username: string;
  @ApiProperty({
    example: 'ion@gmail.com',
    description: 'E-mailul utilizatorului',
  })
  public email: string;
  @ApiProperty({
    example: 'Qwerty12',
    description:
      'Parola (5-12 caractere, sa contina 1 litera mare,1 litera mica,1 cifra)',
  })
  public password: string;
}
