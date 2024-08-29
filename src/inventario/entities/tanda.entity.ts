import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Bodega } from "./bodega.entity";
import { Ubicacion } from "./ubicacion.entity";
import { Categoria } from "./categoria.entity";
import { Movimiento } from "src/movimientos/entities/movimiento.entity";

@Entity()
export class Tanda {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cantidadIngresada: number;

    @Column()
    cantidadActual: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fechaLlegada: Date;

    @Column({ type: 'date' })
    fechaVencimiento: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Bodega, (bodega) => bodega.tandas)
    bodega: Bodega;

    @ManyToOne(() => Producto, (producto) => producto.tandas)
    producto: Producto;

    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.tandas)
    ubicacion: Ubicacion;

    @ManyToOne(() => Categoria, (categoria) => categoria.tandas)
    categoria: Categoria;

    @OneToMany(() => Movimiento, (movimiento) => movimiento.tanda)
    movimientos: Movimiento[];
}