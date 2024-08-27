import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tanda } from "./tanda.entity";
import { Producto } from "./producto.entity";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    urlImagen: string;

    //This is soft delete
    @Column({ default: false })
    isDeleted: boolean;

    @OneToMany(() => Tanda, (tanda) => tanda.categoria)
    tandas: Tanda[];

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];
}