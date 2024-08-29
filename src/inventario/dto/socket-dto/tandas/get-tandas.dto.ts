import { IsUUID } from "class-validator";

export class GetTandaDto {

    @IsUUID()
    idCategoria: string;
}
