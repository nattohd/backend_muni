import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InventarioService } from '../rest/inventario.service';
import { Server } from 'socket.io';
import { TandaResponse } from '../interfaces/tanda-response.interface';
import { GetProductosDto } from '../dto/socket-dto/productos/get-productos.dto';

@Injectable()
export class InventarioSocketService {
    private wss: Server;
    setServer(server: Server) {
        this.wss = server;
    }
    constructor(
        @Inject(forwardRef(() => InventarioService))
        private readonly inventarioService: InventarioService,
    ) { }

    async notifyTandaCreated(tanda: TandaResponse, idCategoria: string) {
        if (this.wss) {
            const room = `${idCategoria}-categoria`;
            this.wss.to(room).emit('newTandaCreated', tanda);
        } else {
            console.error('WebSocket server not initialized - To notify tanda has been created');
            throw new BadRequestException();
        }
    }

    async getInventarioTandasByCategoria(idCategoria: string) {
        if (this.wss) {
            const tandas = await this.inventarioService.findAllTandasByCategoria(idCategoria);
            return tandas;
        } else {
            console.error('WebSocket server not initialized - To get tandas by categoria');
            throw new BadRequestException();
        }
    }
    async getInventarioCategorias() {
        if (this.wss) {
            const categorias = await this.inventarioService.findAllCategorias();
            return categorias;
        } else {
            console.error('WebSocket server not initialized - To get categorias');
            throw new BadRequestException();
        }
    }

    async getProductosByName(getProductosDto: GetProductosDto) {
        const { nameSuggest } = getProductosDto;
        if (this.wss) {
            const productos = await this.inventarioService.findManyProductosByName(nameSuggest);
            return productos;
        } else {
            console.error(`WebSocket server not initialized - To get productos by "${nameSuggest}}"`);
            throw new BadRequestException();
        }
    }


}
