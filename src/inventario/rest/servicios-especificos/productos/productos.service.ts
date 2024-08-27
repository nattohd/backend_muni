import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductoDto } from 'src/inventario/dto/producto-dto/create-producto.dto';
import { Producto } from 'src/inventario/entities/producto.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class ProductosService extends BaseService<Producto> {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) {
        super(productoRepository, 'ProductosService');
    }
    async createProducto(createProductoDto: CreateProductoDto) {
        try {
            const productoCreated = this.productoRepository.create({
                ...createProductoDto,
            });
            const producto = await this.productoRepository.save(productoCreated);
            return producto;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }


}
