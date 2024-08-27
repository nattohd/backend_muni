import { IsString } from "class-validator";

export class CreateBodegaDto {

    @IsString()
    nombre: string;

    @IsString()
    direccion: string;

    @IsString()
    nombreEncargado: string;

}
