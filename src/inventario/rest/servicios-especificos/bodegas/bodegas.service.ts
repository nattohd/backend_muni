import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBodegaDto } from 'src/inventario/dto/rest-dto/bodega-dto/create-bodega.dto';
import { Bodega } from 'src/inventario/entities/bodega.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class BodegasService extends BaseService<Bodega> {
    constructor(
        @InjectRepository(Bodega)
        private readonly bodegaRepository: Repository<Bodega>,

    ) {
        super(bodegaRepository, 'BodegasService');
    }
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

    async findOneById(id: string) {
        try {
            const bodega = await this.bodegaRepository.findOne({ where: { id }, });
            if (!bodega) {
                throw new NotFoundException(`Bodega with ID ${id} not found`);
            }
            return bodega;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }


}
