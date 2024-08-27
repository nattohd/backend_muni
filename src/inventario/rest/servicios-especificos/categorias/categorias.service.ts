import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaDto } from 'src/inventario/dto/categoria-dto/create-categoria.dto';
import { Categoria } from 'src/inventario/entities/categoria.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class CategoriasService extends BaseService<Categoria> {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) {
        super(categoriaRepository, 'CategoriasService');
    }


    async createCategoria(createCategoriaDto: CreateCategoriaDto) {
        try {
            const categoriaCreated = this.categoriaRepository.create({
                ...createCategoriaDto,
            });
            const categoria = await this.categoriaRepository.save(categoriaCreated);
            return categoria;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }




}
