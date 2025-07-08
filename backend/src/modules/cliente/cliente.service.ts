/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';
import { PedidoService } from '../pedido/pedido.service';
import { CreatePedidoDto } from '../pedido/dto/create-pedido.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepo: Repository<ClienteEntity>,
    private readonly pedidoService: PedidoService,
  ) {}

  async create(createDto: CreateClienteDto): Promise<ClienteEntity> {
    const cliente = this.clienteRepo.create(createDto);
    return this.clienteRepo.save(cliente);
  }

  async findOne(id: number): Promise<ClienteEntity> {
    const cliente = await this.clienteRepo.findOne({ where: { id } });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado`);
    return cliente;
  }

  async update(
    id: number,
    updateDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    await this.clienteRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepo.delete(id);
  }

  /**
   * Crea un pedido en línea para este cliente
   */
  async createOrder(clienteId: number, dto: CreatePedidoDto) {
    return this.pedidoService.create({ ...dto, clienteId });
  }

  /**
   * Recupera el histórico de pedidos con su estado
   */
  async getOrderHistory(clienteId: number) {
    return this.pedidoService.findByCliente(clienteId);
  }
}
