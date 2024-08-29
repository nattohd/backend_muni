import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { TandaCreateSchema } from 'src/inventario/interfaces/tanda-create.interface';
import { TandaResponse } from 'src/inventario/interfaces/tanda-response.interface';
import { Tanda } from 'src/inventario/entities';

@Injectable()
export class TandasService extends BaseService<Tanda> {
    constructor(
        @InjectRepository(Tanda)
        private readonly tandaRepository: Repository<Tanda>,

    ) {

        super(tandaRepository, 'TandasService');
    }

    async createTanda(tandaCreateSchema: TandaCreateSchema): Promise<TandaResponse> {
        try {
            const tandaCreated = this.tandaRepository.create({
                ...tandaCreateSchema,
            });
            const tanda = await this.tandaRepository.save(tandaCreated);
            delete tanda.categoria;
            delete tanda.isDeleted;

            return {
                ...tanda,
                bodega: tanda.bodega.nombre,
                producto: tanda.producto.nombre,
                ubicacion: tanda.ubicacion.descripcion,
                //Categoria ya es conocida, para el socket que esta escuchando
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }



    async findAllBy(idCategoria: string): Promise<TandaResponse[]> {
        try {
            const tandasData = await this.tandaRepository.find({
                where: { isDeleted: false, categoria: { id: idCategoria } },
                relations: ['producto', 'bodega', 'ubicacion'],
            });
            const tandas = tandasData.map(t => {
                delete t.isDeleted;
                delete t.categoria; //Se incluye automaticamente por el eager=true
                return {
                    ...t,
                    bodega: t.bodega.nombre,
                    producto: t.producto.nombre,
                    ubicacion: t.ubicacion.descripcion,
                    //Categoria ya es conocida
                };
            })
            return tandas;
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }


}
