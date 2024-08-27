import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductoDto } from 'src/inventario/dto/producto-dto/create-producto.dto';
import { Producto } from 'src/inventario/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
    private readonly logger = new Logger('ProductosService');
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,

    ) { }
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

    async deleteAllProducts() {
        const query = this.productoRepository.createQueryBuilder('productos');
        try {
            return await query.delete().where({}).execute();
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    private handleDbExceptions(error: any) {
        this.logger.error(error);
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        throw new InternalServerErrorException(
            'Error inesperado, check logs del server.',
        );
    }
}
