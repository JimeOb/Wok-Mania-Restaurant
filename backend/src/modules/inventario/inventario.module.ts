import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioService } from './inventario.service';
import { InventarioEntity } from './entities/inventario.entity';
import { InventarioController } from './inventario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InventarioEntity])],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
