import { IsOptional, IsString } from "class-validator";

export class CreateProductoDto {

    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    barcode?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    urlImagen?: string;

}
