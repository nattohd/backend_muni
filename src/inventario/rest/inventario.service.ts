import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InventarioSocketService } from '../socket/inventario.socket.service';
import { CreateProductoDto } from '../dto/producto-dto/create-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from '../dto/categoria-dto/create-categoria.dto';
import { Categoria } from '../entities/categoria.entity';
import { ProductosService } from './servicios-especificos/productos/productos.service';
import { CategoriasService } from './servicios-especificos/categorias/categorias.service';
import { BodegasService } from './servicios-especificos/bodegas/bodegas.service';
import { TandasService } from './servicios-especificos/tandas/tandas.service';
import { UbicacionesService } from './servicios-especificos/ubicaciones/ubicaciones.service';
import { CreateBodegaDto } from '../dto/bodega-dto/create-bodega.dto';
import { CreateUbicacionDto } from '../dto/ubicacion-dto/create-ubicacion.dto';
import { CreateTandaDto } from '../dto/tanda-dto/create-tanda.dto';


@Injectable()
export class InventarioService {

  constructor(
    private readonly productoService: ProductosService,
    private readonly categoriaService: CategoriasService,
    private readonly bodegasService: BodegasService,
    private readonly ubicacionesService: UbicacionesService,
    private readonly tandasService: TandasService,


    @Inject(forwardRef(() => InventarioSocketService))
    private readonly inventarioSocketService: InventarioSocketService,
  ) { }

  async createProducto(createProductoDto: CreateProductoDto) {
    const producto = await this.productoService.createProducto(createProductoDto);
    //TODO: notificar por sockets
    return producto;
  }
  async createCategoria(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.categoriaService.createCategoria(createCategoriaDto);
    //TODO: notificar por sockets
    return categoria;
  }
  async createBodega(createBodegaDto: CreateBodegaDto) {
    const bodega = await this.bodegasService.createBodega(createBodegaDto);
    //TODO: notificar por sockets
    return bodega;
  }
  async createUbicacion(createUbicacionDto: CreateUbicacionDto) {
    const ubicacion = await this.ubicacionesService.createUbicacion(createUbicacionDto);
    //TODO: notificar por sockets
    return ubicacion;
  }

  //!Proceso que requiere mucha carga, será lento.
  async createTanda(createTandaDto: CreateTandaDto) {
    try {
      const { idBodega, idCategoria, idProducto, idUbicacion } = createTandaDto;
      const bodega = await this.bodegasService.findOneById(idBodega);
      const categoria = await this.categoriaService.findOneById(idCategoria);
      const producto = await this.productoService.findOneById(idProducto);
      const ubicacion = await this.ubicacionesService.findOneById(idUbicacion);

      const { cantidadIngresada, fechaVencimiento } = createTandaDto;

      const tanda = await this.tandasService.createTanda({
        cantidadIngresada,
        cantidadActual: cantidadIngresada,
        fechaVencimiento,
        bodega,
        categoria,
        producto,
        ubicacion,
      });
      //TODO: notificar por sockets
      return tanda;
    } catch (error) {
      console.log({ error })
      throw new BadRequestException(error.message);
    }
  }




}
