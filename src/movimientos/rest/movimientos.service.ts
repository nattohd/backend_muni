import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from '../entities/movimiento.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateMovimientoDto } from '../dto/create_movimiento.dto';
import { TandasService } from 'src/inventario/rest/servicios-especificos';
import { MovimientosSocketService } from '../socket/movimientos.socket.service';

@Injectable()
export class MovimientosService {

    constructor(
        private readonly tandasService: TandasService,
        @InjectRepository(Movimiento)
        private readonly movimientoRepository: Repository<Movimiento>,

        private readonly dataSource: DataSource, // Inyección de DataSource para transaccion

        @Inject(forwardRef(() => MovimientosSocketService))
        private readonly movimientosSocketService: MovimientosSocketService,
    ) {
    }

    async createMovimiento(createMovimientoDto: CreateMovimientoDto) {
        const { idTanda, cantidadRetirada } = createMovimientoDto;

        // Iniciar la transacción
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();


        try {
            // Crear el movimiento
            const tandaInstance = await this.tandasService.generateClass(idTanda);
            const movimientoCreated = this.movimientoRepository.create({
                cantidadRetirada,
                tanda: tandaInstance,
            });

            // Guardar el movimiento dentro de la transacción
            const movimiento = await queryRunner.manager.save(movimientoCreated);

            // Descontar la cantidad del movimiento a la tanda
            await this.tandasService.substractAmountToTanda(idTanda, cantidadRetirada);

            throw new InternalServerErrorException();
            // Confirmar la transacción
            await queryRunner.commitTransaction();

            //* Notificar por socket movimiento nuevo
            //* Notificar actualización de la tanda

            //Error de prueba
            return movimiento;
        } catch (error) {
            // Revertir todos los cambios si ocurre un error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Liberar el queryRunner
            await queryRunner.release();
        }
    }
}
