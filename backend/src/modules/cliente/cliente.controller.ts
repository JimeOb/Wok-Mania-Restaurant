import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreatePedidoDto } from '../pedido/dto/create-pedido.dto';
import { ClienteEntity } from './entities/cliente.entity';
import { PedidoEntity } from '../pedido/entities/pedido.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() dto: CreateClienteDto): Promise<ClienteEntity> {
    return this.clienteService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ClienteEntity> {
    return this.clienteService.findOne(id);
  }

  @Post(':id/pedidos')
  createOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePedidoDto,
  ): Promise<PedidoEntity> {
    return this.clienteService.createOrder(id, dto);
  }

  @Get(':id/pedidos')
  getOrderHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PedidoEntity[]> {
    return this.clienteService.getOrderHistory(id);
  }

  @Post(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    return this.clienteService.update(id, dto);
  }
}
