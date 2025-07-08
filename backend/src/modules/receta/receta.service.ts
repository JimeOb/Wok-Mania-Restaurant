import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaEntity } from './entities/receta.entity';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(RecetaEntity)
    private readonly recetaRepo: Repository<RecetaEntity>,
  ) {}

  async getItemsByProducto(productoId: number): Promise<RecetaEntity[]> {
    return this.recetaRepo.find({ where: { productoId } });
  }
}
