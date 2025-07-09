import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Alerta } from './alerta.model';
import { FirebaseService } from '@core/firebase/firebase.service';

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

  constructor(private readonly fbService: FirebaseService) {}

  async enviarAlertaRetraso(alertas: AgrupadoPorUsuario[]) {
    for (const alerta of alertas) {
      if (alerta.nuevos.length) {
        const url = `alerta_retraso/${alerta.idUsuario}`;
        console.log('url', url);
        this.server.emit(url, alerta);
      }

      for (const item of alerta.nuevos) {
        // 📨 Enviar notificación por Firebase
        try {
          await this.fbService.sendToTopic(`${alerta.idUsuario}`, {
            notification: {
              title: item.titulo,
              body: item.descripcion,
            },
            data: {
              tipo: 'retraso',
              idUsuario: alerta.idUsuario,
            },
          });
        } catch (error) {
          console.error(
            `Error al enviar notificación FCM al usuario ${alerta.idUsuario}`,
            error,
          );
        }
      }
    }
  }
}
