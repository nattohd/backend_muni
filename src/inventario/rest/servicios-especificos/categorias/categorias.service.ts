import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaDto } from 'src/inventario/dto/categoria-dto/create-categoria.dto';
import { Categoria } from 'src/inventario/entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
    private readonly logger = new Logger('CategoriasService');
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,

    ) { }


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


    async deleteAllCategorias() {
        const query = this.categoriaRepository.createQueryBuilder('categorias');
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
