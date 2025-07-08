/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaEntity } from './entities/receta.entity';
import { RecetaItemEntity } from './entities/receta-item.entity';
import { InventarioService } from '../inventario/inventario.service';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(RecetaEntity)
    private readonly recetaRepo: Repository<RecetaEntity>,
    @InjectRepository(RecetaItemEntity)
    private readonly itemRepo: Repository<RecetaItemEntity>,
    private readonly inventarioService: InventarioService,
  ) {}

  /**
   * Obtiene todos los insumos de la receta de un producto
   */
  async getItemsByProducto(productoId: number): Promise<RecetaItemEntity[]> {
    const receta = await this.recetaRepo.findOne({
      where: { productoId },
      relations: ['items'],
    });
    if (!receta) {
      throw new NotFoundException(
        `Receta para producto ${productoId} no encontrada`,
      );
    }
    return receta.items;
  }

  async validateStock(productoId: number, cantidad: number): Promise<boolean> {
    const items = await this.getItemsByProducto(productoId);
    for (const { insumoId, cantidadNecesaria } of items) {
      const total = cantidadNecesaria * cantidad;
      const ok = await this.inventarioService.checkStock(insumoId, total);
      if (!ok) {
        return false;
      }
    }
    return true;
  }

  /**
   * Crea o actualiza la receta (varios insumos) para un producto
   */
  async createOrUpdateRecipe(
    productoId: number,
    items: { insumoId: number; cantidadNecesaria: number }[],
  ) {
    let receta = await this.recetaRepo.findOne({ where: { productoId } });
    if (!receta) {
      receta = this.recetaRepo.create({ productoId });
      receta = await this.recetaRepo.save(receta);
    }
    // Reemplaza los ítems existentes
    await this.itemRepo.delete({ recetaId: receta.id });
    const entities = items.map(i =>
      this.itemRepo.create({
        recetaId: receta.id,
        insumoId: i.insumoId,
        cantidadNecesaria: i.cantidadNecesaria,
      }),
    );
    return this.itemRepo.save(entities);
  }

  async assertStockOrFail(productoId: number, cantidad: number): Promise<void> {
    const items = await this.getItemsByProducto(productoId);
    for (const { insumoId, cantidadNecesaria } of items) {
      const total = cantidadNecesaria * cantidad;
      const ok = await this.inventarioService.checkStock(insumoId, total);
      if (!ok) {
        throw new BadRequestException(
          `Stock insuficiente para insumo ${insumoId} (necesita ${total})`,
        );
      }
    }
  }

}
