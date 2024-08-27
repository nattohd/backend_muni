import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateProductoDto } from '../dto/producto-dto/create-producto.dto';
import { CreateCategoriaDto } from '../dto/categoria-dto/create-categoria.dto';


@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) { }

  @Post('productos')
  createProducto(@Body() createProductoDto: CreateProductoDto) {
    return this.inventarioService.createProducto(createProductoDto);
  }
  @Post('categorias')
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.inventarioService.createCategoria(createCategoriaDto);
  }

  // @Get()
  // findAll() {
  //   return this.inventarioService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.inventarioService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRestDto: UpdateRestDto) {
  //   return this.inventarioService.update(+id, updateRestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inventarioService.remove(+id);
  // }
}
