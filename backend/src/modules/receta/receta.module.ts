import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaService } from './receta.service';
import { RecetaEntity } from './entities/receta.entity';
import { RecetaItemEntity } from './entities/receta-item.entity';
import { RecetaController } from './receta.controller';
import { InventarioModule } from '../inventario/inventario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecetaEntity, RecetaItemEntity]),
    InventarioModule,
  ],
  providers: [RecetaService],
  controllers: [RecetaController],
  exports: [RecetaService],
})
export class RecetaModule {}
