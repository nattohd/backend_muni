import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTandaDto } from 'src/inventario/dto/tanda-dto/create-tanda.dto';
import { Tanda } from 'src/inventario/entities/tanda.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class TandasService extends BaseService<Tanda> {
    constructor(
        @InjectRepository(Tanda)
        private readonly tandaRepository: Repository<Tanda>,

    ) {

        super(tandaRepository, 'TandasService');
    }

    async createTanda(createTandaDto: CreateTandaDto) {
        try {
            const tandaCreated = this.tandaRepository.create({
                ...createTandaDto,
            });
            const tanda = await this.tandaRepository.save(tandaCreated);
            return tanda;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }



}
