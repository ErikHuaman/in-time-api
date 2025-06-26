import { Usuario } from '@modules/usuario/usuario.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Usuario | undefined => {
    // Si es una conexión WebSocket
    if (context.getType() === 'ws') {
      const client = context.switchToWs().getClient();
      return client.user;
    }
    // Si es una petición HTTP
    else {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return user ? user.toJSON() : undefined;
    }
  },
);
