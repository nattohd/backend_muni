import { WebSocketGateway } from '@nestjs/websockets';
import { InventarioSocketService } from './inventario.socket.service';

@WebSocketGateway()
export class InventarioSocketGateway {
  constructor(private readonly inventarioSocketService: InventarioSocketService) { }
}
