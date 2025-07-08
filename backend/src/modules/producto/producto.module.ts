import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
