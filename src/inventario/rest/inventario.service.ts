import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRestDto } from '../dto/dto/create-rest.dto';
import { UpdateRestDto } from '../dto/dto/update-rest.dto';
import { InventarioSocketService } from '../socket/inventario.socket.service';


@Injectable()
export class InventarioService {
  constructor(

    @Inject(forwardRef(() => InventarioSocketService))
    private readonly inventarioSocketService: InventarioSocketService,
  ) { }



  create(createRestDto: CreateRestDto) {
    return 'This action adds a new rest';
  }

  findAll() {
    return `This action returns all rest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rest`;
  }

  update(id: number, updateRestDto: UpdateRestDto) {
    return `This action updates a #${id} rest`;
  }

  remove(id: number) {
    return `This action removes a #${id} rest`;
  }
}
