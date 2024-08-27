import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBodegaDto } from 'src/inventario/dto/bodega-dto/create-bodega.dto';
import { Bodega } from 'src/inventario/entities/bodega.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BodegasService {
    private readonly logger = new Logger('BodegasService');
    constructor(
        @InjectRepository(Bodega)
        private readonly bodegaRepository: Repository<Bodega>,

    ) { }
    async createBodega(createBodegaDto: CreateBodegaDto) {
        try {
            const bodegaCreated = this.bodegaRepository.create({
                ...createBodegaDto,
            });
            const bodega = await this.bodegaRepository.save(bodegaCreated);
            return bodega;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    async deleteAllBodegas() {
        const query = this.bodegaRepository.createQueryBuilder('bodegas');
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
