import { IsString, IsUUID } from "class-validator";

export class CreateUbicacionDto {

    @IsString()
    descripcion: string;

    @IsUUID()
    idBodega: string;

}
