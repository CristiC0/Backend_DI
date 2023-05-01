import { Controller, Post, Get, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Everything is good!',
  })
  @ApiResponse({
    status: 400,
    description: 'User with this email already exists',
  })
  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Log in succesful!',
  })
  @ApiResponse({
    status: 400,
    description: 'No user with this email',
  })
  @ApiResponse({
    status: 401,
    description: 'Wrong password',
  })
  @Post('login')
  login(@Body() dto: LoginDTO, @Req() req, @Res() res) {
    return this.authService.login(dto, req, res);
  }

  @ApiResponse({
    status: 200,
    description: 'Log out succesful!',
  })
  @Get('logout')
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }
}
