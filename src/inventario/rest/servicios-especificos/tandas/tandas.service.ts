import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTandaDto } from 'src/inventario/dto/tanda-dto/create-tanda.dto';
import { Tanda } from 'src/inventario/entities/tanda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TandasService {
    private readonly logger = new Logger('TandasService');
    constructor(
        @InjectRepository(Tanda)
        private readonly tandaRepository: Repository<Tanda>,

    ) { }

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


    async deleteAllTandas() {
        const query = this.tandaRepository.createQueryBuilder('tandas');
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
