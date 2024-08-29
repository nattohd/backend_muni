import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InventarioSocketService } from './inventario.socket.service';
import { Server, Socket } from 'socket.io';
import { GetTandaDto } from '../dto/socket-dto';

@WebSocketGateway({ cors: true, namespace: 'inventario' })
export class InventarioSocketGateway {
  constructor(private readonly inventarioSocketService: InventarioSocketService) { }

  @WebSocketServer()
  wss: Server;

  afterInit(server: Server) {
    this.inventarioSocketService.setServer(server);
  }

  @SubscribeMessage('getAllCategorias')
  async findAllCategorias(client: Socket,) {
    const data =
      await this.inventarioSocketService.getInventarioCategorias();

    client.emit('loadAllCategorias', data);
  }

  @SubscribeMessage('getTandasByIdCategoria')
  async findAllTandasOfCategoria(client: Socket, payload: GetTandaDto) {
    const { idCategoria } = payload;

    const room = `${idCategoria}-categoria`;
    client.join(room);

    if (!idCategoria) return;

    const tandasPorCategoria =
      await this.inventarioSocketService.getInventarioTandasByCategoria(idCategoria);
    client.emit(`${idCategoria}-tanda`, tandasPorCategoria);
    // this.wss.emit(`${idCategoria}-tanda`, tandasPorCategoria); // para pruebas
  }
}

