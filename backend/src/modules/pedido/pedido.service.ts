/* eslint-disable @typescript-eslint/await-thenable */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoEntity, EstadoPedido } from './entities/pedido.entity';
import { DetallePedidoEntity } from './entities/detalle-pedido.entity';
import { ProductoService } from '../producto/producto.service';
import { RecetaService } from '../receta/receta.service';
import { InventarioService } from '../inventario/inventario.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepo: Repository<PedidoEntity>,
    private readonly productoService: ProductoService,
    private readonly recetaService: RecetaService,
    private readonly inventarioService: InventarioService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Crea un pedido validando stock y descontando inventario en una transacción
   */
  async create(createDto: CreatePedidoDto): Promise<PedidoEntity> {
    // 1. Recorre y valida cada producto
    for (const item of createDto.items) {
      const producto = await this.productoService.findOne(item.productoId);
      if (!producto) {
        throw new NotFoundException(`Producto ${item.productoId} no existe`);
      }
      // 2. Obtén receta (lista de insumos y qty por unidad de plato)
      const recetaItems = await this.recetaService.getItemsByProducto(
        item.productoId,
      );
      // 3. Para cada insumo: calcular total = recetaQty * cantidad
      for (const ri of recetaItems) {
        const totalNecesario = ri.cantidadNecesaria * item.cantidad;
        const ok = await this.inventarioService.checkStock(
          ri.insumoId,
          totalNecesario,
        );
        if (!ok) {
          throw new BadRequestException(
            `Stock insuficiente para insumo ${ri.insumoId} en producto ${item.productoId}`,
          );
        }
      }
    }

    // 4. Si todo OK, comienza transacción para guardar pedido + detalles + descontar stock
    return this.dataSource.transaction(async (manager) => {
      const pedido = manager.create(PedidoEntity, {
        canal: createDto.canal,
        clienteId: createDto.clienteId,
        mesaId: createDto.mesaId,
        estado: EstadoPedido.REGISTRADO,
      });

      const savedPedido = await manager.save(pedido);

      // guarda cada detalle
      for (const item of createDto.items) {
        const detalle = manager.create(DetallePedidoEntity, {
          pedido: savedPedido,
          productoId: item.productoId,
          cantidad: item.cantidad,
        });
        await manager.save(detalle);
        // descuenta inventario
        const recetaItems = await this.recetaService.getItemsByProducto(
          item.productoId,
        );
        for (const ri of recetaItems) {
          const totalNecesario = ri.cantidadNecesaria * item.cantidad;
          await this.inventarioService.decrementStock(
            ri.insumoId,
            totalNecesario,
            manager,
          );
        }
      }

      return savedPedido;
    });
  }

  /**
   * Lista pedidos por cliente o por canal
   */
  async findByCliente(clienteId: number) {
    return this.pedidoRepo.find({
      where: { clienteId },
      relations: ['detalles'],
    });
  }

  /**
   * Actualiza estado de un pedido
   */
  async updateEstado(id: number, estado: EstadoPedido) {
    const pedido = await this.pedidoRepo.findOneBy({ id });
    if (!pedido) throw new NotFoundException(`Pedido ${id} no existe`);
    pedido.estado = estado;
    return this.pedidoRepo.save(pedido);
  }
}
