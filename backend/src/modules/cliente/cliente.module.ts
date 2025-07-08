import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteEntity } from './entities/cliente.entity';
import { PedidoModule } from '../pedido/pedido.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity]), PedidoModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
