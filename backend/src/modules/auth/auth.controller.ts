import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * { cedula, password, role } → valida y devuelve datos del usuario.
   */
  @Post('login')
  async login(@Body() dto: CreateAuthDto) {
    const user = await this.authService.validateUser(
      dto.cedula,
      dto.password,
      dto.role,
    );
    return { user };
  }
}
