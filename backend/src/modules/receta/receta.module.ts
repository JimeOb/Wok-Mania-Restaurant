import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaService } from './receta.service';
import { RecetaEntity } from './entities/receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecetaEntity])],
  providers: [RecetaService],
  exports: [RecetaService],
})
export class RecetaModule {}
