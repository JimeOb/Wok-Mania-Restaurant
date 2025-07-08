import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InventarioEntity } from './entities/inventario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(InventarioEntity)
    private readonly invRepo: Repository<InventarioEntity>,
  ) {}

  /** Comprueba si hay suficiente stock */
  async checkStock(insumoId: number, cantidad: number): Promise<boolean> {
    const rec = await this.invRepo.findOneBy({ insumoId });
    return rec != null && rec.cantidad >= cantidad;
  }

  /**
   * Descuenta stock dentro de la transacción
   */
  async decrementStock(
    insumoId: number,
    cantidad: number,
    manager: EntityManager,
  ): Promise<void> {
    const rec = await manager.findOne(InventarioEntity, {
      where: { insumoId },
    });
    if (!rec || rec.cantidad < cantidad) {
      throw new BadRequestException(
        `Stock insuficiente para insumo ${insumoId}`,
      );
    }
    rec.cantidad -= cantidad;
    await manager.save(rec);
  }
}
