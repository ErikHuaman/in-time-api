import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Alerta } from './alerta.model';

type AgrupadoPorUsuario = {
  idUsuario: string;
  nuevos: Alerta[];
  historicos: Alerta[];
};

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class AlertaGateway {
  @WebSocketServer()
  server: Server;

  enviarAlertaRetraso(alertas: AgrupadoPorUsuario[]) {
    alertas.forEach((alerta: AgrupadoPorUsuario) => {
      this.server.emit(`alerta_retraso/${alerta.idUsuario}`, alerta);
    });
  }
}
