import { IsString, IsUUID } from "class-validator";

export class GetProductosDto {

    @IsString()
    nameSuggest: string;

}
