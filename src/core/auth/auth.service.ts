import { Injectable } from '@nestjs/common';
import { Usuario } from '@modules/usuario/usuario.model';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(
    username: string,
    password: string,
  ): Promise<Usuario | null> {
    return this.userService.validateUsuario(username, password);
  }

  async login(user: Usuario) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      // user,
    };
  }
}
