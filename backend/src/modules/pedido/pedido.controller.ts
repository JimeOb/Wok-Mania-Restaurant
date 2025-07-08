import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { EstadoPedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidoService.create(dto);
  }

  @Get('cliente/:id')
  getByCliente(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.findByCliente(id);
  }

  @Post(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: EstadoPedido,
  ) {
    return this.pedidoService.updateEstado(id, estado);
  }
}
