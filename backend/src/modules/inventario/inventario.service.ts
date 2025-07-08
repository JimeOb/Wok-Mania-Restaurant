import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventarioEntity } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(InventarioEntity)
    private readonly invRepo: Repository<InventarioEntity>,
  ) {}

  // CRUD para administrador
  async create(dto: CreateInventarioDto): Promise<InventarioEntity> {
    const record = this.invRepo.create(dto);
    return this.invRepo.save(record);
  }

  async findAll(): Promise<InventarioEntity[]> {
    return this.invRepo.find();
  }

  async findOne(id: number): Promise<InventarioEntity> {
    const record = await this.invRepo.findOneBy({ id });
    if (!record) {
      throw new NotFoundException(`Inventario ${id} no encontrado`);
    }
    return record;
  }

  async update(
    id: number,
    dto: UpdateInventarioDto,
  ): Promise<InventarioEntity> {
    const result = await this.invRepo.update(id, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Inventario ${id} no encontrado`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.invRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inventario ${id} no encontrado`);
    }
  }

  // Métodos para uso interno (Pedido/Receta)
  async checkStock(insumoId: number, cantidad: number): Promise<boolean> {
    const record = await this.invRepo.findOneBy({ insumoId });
    return !!record && record.cantidad >= cantidad;
  }

  async decrementStock(
    insumoId: number,
    cantidad: number,
    manager: EntityManager,
  ): Promise<void> {
    const record = await manager.findOne(InventarioEntity, {
      where: { insumoId },
    });
    if (!record || record.cantidad < cantidad) {
      throw new BadRequestException(
        `Stock insuficiente para insumo ${insumoId}`,
      );
    }
    record.cantidad = Number(record.cantidad) - cantidad;
    await manager.save(record);
  }
}
