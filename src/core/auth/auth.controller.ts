import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RolService } from '@modules/rol/rol.service';
import { AuthDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private rolService: RolService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() dto: AuthDTO, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('verificarModulo')
  async verificarModulo(@CurrentUser() user: any, @Body() dto: any) {
    const modulo = await this.rolService.getModuloByIdRol(
      user.idRol,
      dto?.url,
    );
    return !!modulo;
  }
}
