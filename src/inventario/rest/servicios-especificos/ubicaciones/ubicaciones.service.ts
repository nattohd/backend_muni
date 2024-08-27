import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUbicacionDto } from 'src/inventario/dto/ubicacion-dto/create-ubicacion.dto';
import { Ubicacion } from 'src/inventario/entities/ubicacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UbicacionesService {
    private readonly logger = new Logger('UbicacionesService');
    constructor(
        @InjectRepository(Ubicacion)
        private readonly ubicacionRepository: Repository<Ubicacion>,

    ) { }

    async createUbicacion(createUbicacionDto: CreateUbicacionDto) {
        try {
            const ubicacionCreated = this.ubicacionRepository.create({
                ...createUbicacionDto,
            });
            const ubicacion = await this.ubicacionRepository.save(ubicacionCreated);
            return ubicacion;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    async deleteAllUbicaciones() {
        const query = this.ubicacionRepository.createQueryBuilder('ubicaciones');
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
