import { Tanda } from "src/inventario/entities/tanda.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Movimiento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cantidadRetirada: number;

    @Column({ type: 'date' })
    fecha: string;

    @Column()
    hora: string;

    //This is soft delete
    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Tanda, (tanda) => tanda.movimientos)
    tanda: Tanda;
}
