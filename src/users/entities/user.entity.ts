import { ApiProperty } from '@nestjs/swagger';
export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ enum: ['USER', 'ADMIN', 'TEACHER'] })
  role: string;
}
