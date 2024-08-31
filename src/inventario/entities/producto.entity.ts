import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tanda } from "./tanda.entity";
import { Categoria } from "./categoria.entity";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nombre: string;

    @Column({ nullable: true })
    barcode?: string;

    @Column({ nullable: true })
    descripcion?: string;

    @Column({ nullable: true })
    urlImagen?: string;

    //This is soft delete
    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    categoria: Categoria

    @OneToMany(() => Tanda, (tanda) => tanda.producto)
    tandas: Tanda[];
}