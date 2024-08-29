import { PartialType } from '@nestjs/mapped-types';
import { CreateTandaDto } from './create-tanda.dto';

export class UpdateTandaDto extends PartialType(CreateTandaDto) { }
