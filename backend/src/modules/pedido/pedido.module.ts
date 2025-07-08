import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoEntity } from './entities/pedido.entity';
import { DetallePedidoEntity } from './entities/detalle-pedido.entity';
import { ProductoModule } from '../producto/producto.module';
import { RecetaModule } from '../receta/receta.module';
import { InventarioModule } from '../inventario/inventario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, DetallePedidoEntity]),
    ProductoModule,
    RecetaModule,
    InventarioModule,
  ],
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [PedidoService],
})
export class PedidoModule {}
