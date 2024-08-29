import { WebSocketGateway } from '@nestjs/websockets';
import { MovimientosSocketService } from './movimientos.socket.service';

@WebSocketGateway()
export class MovimientosSocketGateway {
  constructor(private readonly movimientosSocketService: MovimientosSocketService) { }
}
