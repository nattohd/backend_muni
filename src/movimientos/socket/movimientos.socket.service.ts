import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { MovimientosService } from '../rest/movimientos.service';
import { Movimiento } from '../entities/movimiento.entity';
import { InventarioSocketService } from 'src/inventario/socket/inventario.socket.service';
import { TandaResponse } from 'src/inventario/interfaces/tanda-response.interface';
@Injectable()
export class MovimientosSocketService {
    private wss: Server;
    setServer(server: Server) {
        this.wss = server;
    }

    constructor(
        private readonly inventarioSocketService: InventarioSocketService,

        @Inject(forwardRef(() => MovimientosService))
        private readonly movimientosService: MovimientosService,
    ) { }

    async notifyMovimientoCreated(movimiento: Movimiento) {
        if (this.wss) {
            //?Emision de cambios
            this.wss.emit('newMovimientoCreated', movimiento);
        } else {
            console.error('WebSocket server not initialized - To notify movimiento has been created');
            throw new BadRequestException();
        }
    }
    async notifyTandaDiscount(tanda: TandaResponse) {
        await this.inventarioSocketService.notifyTandaUpdate(tanda);
    }
}

