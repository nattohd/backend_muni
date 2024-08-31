import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MovimientosSocketService } from './movimientos.socket.service';
import { Server } from 'http';

@WebSocketGateway()
export class MovimientosSocketGateway {
  constructor(private readonly movimientosSocketService: MovimientosSocketService) { }

  @WebSocketServer()
  wss: Server;

  afterInit(server: Server) {
    this.movimientosSocketService.setServer(server);
  }
}
