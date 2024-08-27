import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InventarioService } from '../rest/inventario.service';

@Injectable()
export class InventarioSocketService {

    constructor(
        @Inject(forwardRef(() => InventarioService))
        private readonly inventarioService: InventarioService,
    ) { }



}
