import { forwardRef, Module } from "@nestjs/common";
import { InventarioService } from "./rest/inventario.service";
import { InventarioController } from "./rest/inventario.controller";
import { InventarioSocketService } from "./socket/inventario.socket.service";
import { InventarioSocketGateway } from "./socket/inventario.socket.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bodega } from "./entities/bodega.entity";
import { Categoria } from "./entities/categoria.entity";
import { Ubicacion } from "./entities/ubicacion.entity";
import { Producto } from "./entities/producto.entity";
import { Tanda } from "./entities/tanda.entity";


@Module({
    imports: [
        // AuthModule,
        TypeOrmModule.forFeature([Bodega, Categoria, Ubicacion, Producto, Tanda,]),
        forwardRef(() => InventarioModule),
    ],
    controllers: [InventarioController],
    providers: [
        InventarioService,
        InventarioSocketService,
        InventarioSocketGateway,
    ],
    exports: [InventarioService, InventarioSocketService],
})
export class InventarioModule { }