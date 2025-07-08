import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './entities/producto.entity';
import { RecetaModule } from '../receta/receta.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity]), RecetaModule],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
