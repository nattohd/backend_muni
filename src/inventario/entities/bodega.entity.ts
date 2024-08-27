import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ubicacion } from "./ubicacion.entity";
import { Tanda } from "./tanda.entity";

@Entity()
export class Bodega {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    nombreEncargado: string;

    //This is soft delete
    @Column({ default: false })
    isDeleted: boolean;

    @OneToMany(() => Ubicacion, (ubicacion) => ubicacion.bodega)
    ubicaciones: Ubicacion[];

    @OneToMany(() => Tanda, (tanda) => tanda.bodega)
    tandas: Tanda[];
}