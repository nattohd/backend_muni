import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUbicacionDto } from 'src/inventario/dto/rest-dto/ubicacion-dto/create-ubicacion.dto';
import { Ubicacion } from 'src/inventario/entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class UbicacionesService extends BaseService<Ubicacion> {
    constructor(
        @InjectRepository(Ubicacion)
        private readonly ubicacionRepository: Repository<Ubicacion>,

    ) {

        super(ubicacionRepository, 'UbicacionesService');
    }

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

    async findOneById(id: string) {
        try {
            const ubicacion = await this.ubicacionRepository.findOne({ where: { id }, });
            if (!ubicacion) {
                throw new NotFoundException(`Ubicacion with ID ${id} not found`);
            }
            return ubicacion;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    async findAll() {
        try {
            const ubicaciones = await this.ubicacionRepository.find();

            return ubicaciones;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }


}
