import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { Producto } from 'src/inventario/entities';
import { CreateProductoDto } from 'src/inventario/dto/rest-dto';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class ProductosService extends BaseService<Producto> {
    constructor(
        private readonly categoriaService: CategoriasService,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) {
        super(productoRepository, 'ProductosService');
    }
    async createProducto(createProductoDto: CreateProductoDto) {
        try {
            const { idCategoria } = createProductoDto;
            const categoria = await this.categoriaService.findOneById(idCategoria);
            const productoCreated = this.productoRepository.create({
                ...createProductoDto,
                categoria
            });
            const producto = await this.productoRepository.save(productoCreated);
            return producto;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    async findOneById(id: string) {
        try {
            const producto = await this.productoRepository.findOne({ where: { id }, });
            if (!producto) {
                throw new NotFoundException(`Producto with ID ${id} not found`);
            }
            return producto;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }




}
