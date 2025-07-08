import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from './entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly prodRepo: Repository<ProductoEntity>,
  ) {}

  async findOne(id: number): Promise<ProductoEntity> {
    const p = await this.prodRepo.findOneBy({ id });
    if (!p) throw new NotFoundException(`Producto ${id} no encontrado`);
    return p;
  }
}
