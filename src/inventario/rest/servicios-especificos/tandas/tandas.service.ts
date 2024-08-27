import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTandaDto } from 'src/inventario/dto/tanda-dto/create-tanda.dto';
import { Tanda } from 'src/inventario/entities/tanda.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { TandaCreateSchema } from 'src/inventario/interfaces/tanda-create.interface';

@Injectable()
export class TandasService extends BaseService<Tanda> {
    constructor(
        @InjectRepository(Tanda)
        private readonly tandaRepository: Repository<Tanda>,

    ) {

        super(tandaRepository, 'TandasService');
    }

    async createTanda(tandaCreateSchema: TandaCreateSchema) {
        try {
            const tandaCreated = this.tandaRepository.create({
                ...tandaCreateSchema,
            });
            const tanda = await this.tandaRepository.save(tandaCreated);
            return tanda;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }



}
