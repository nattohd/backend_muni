import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { InventarioModule } from 'src/inventario/inventario.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [InventarioModule]
})
export class SeedModule { }
