import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { MovimientosService } from '../rest/movimientos.service';
@Injectable()
export class MovimientosSocketService {
    private wss: Server;
    setServer(server: Server) {
        this.wss = server;
    }

    constructor(
        @Inject(forwardRef(() => MovimientosService))
        private readonly movimientosService: MovimientosService,
    ) { }

    async notifyMovimientoCreated() { }
    async notifyTandaDiscount() { }
}

