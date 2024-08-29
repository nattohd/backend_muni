import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityMetadata, Repository } from 'typeorm';

export class BaseService<T> {
    protected readonly logger: Logger;

    constructor(
        private readonly repository: Repository<T>,
        serviceName: string,
    ) {
        this.logger = new Logger(serviceName);
    }


    async deleteAll(): Promise<void> {
        const query = this.repository.createQueryBuilder();
        try {
            await query.delete().where({}).execute();
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    async findAll() {
        try {
            const metadata: EntityMetadata = this.repository.metadata;

            const queryBuilder = this.repository.createQueryBuilder('entity');

            // Verifica si la entidad tiene la columna 'isDelete'
            if (metadata.findColumnWithPropertyName('isDelete')) {
                queryBuilder.where('entity.isDelete = :isDelete', { isDelete: false });
            }

            const entities = await queryBuilder.getMany();
            return entities;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }


    protected handleDbExceptions(error: any): void {
        this.logger.error(error);
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        throw new InternalServerErrorException(
            'Error inesperado, check logs del server.',
        );
    }
}
