import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateRestDto } from '../dto/dto/create-rest.dto';
import { UpdateRestDto } from '../dto/dto/update-rest.dto';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) { }

  @Post()
  create(@Body() createRestDto: CreateRestDto) {
    return this.inventarioService.create(createRestDto);
  }

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestDto: UpdateRestDto) {
    return this.inventarioService.update(+id, updateRestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
