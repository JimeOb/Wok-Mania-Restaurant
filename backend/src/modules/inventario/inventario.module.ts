import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioService } from './inventario.service';
import { InventarioEntity } from './entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventarioEntity])],
  providers: [InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
