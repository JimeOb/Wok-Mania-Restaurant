import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { RecetaService } from '../receta/receta.service';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepo: Repository<ProductoEntity>,
    private readonly recetaService: RecetaService,
  ) {}

  /**
   * Crea un nuevo producto
   */
  async create(dto: CreateProductoDto): Promise<ProductoEntity> {
    const producto = this.productoRepo.create(dto);
    return this.productoRepo.save(producto);
  }

  /**
   * Obtiene todos los productos
   */
  async findAll(): Promise<ProductoEntity[]> {
    return this.productoRepo.find({ relations: ['recetas'] });
  }

  /**
   * Obtiene un producto por su ID
   */
  async findOne(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepo.findOne({
      where: { id },
      relations: ['recetas'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return producto;
  }

  /**
   * Actualiza un producto existente
   */
  async update(id: number, dto: UpdateProductoDto): Promise<ProductoEntity> {
    await this.productoRepo.update(id, dto);
    return this.findOne(id);
  }

  /**
   * Elimina un producto
   */
  async remove(id: number): Promise<void> {
    await this.productoRepo.delete(id);
  }

  /**
   * Valida si hay stock suficiente para preparar `cantidad` unidades del producto
   */
  async validateStock(productoId: number, cantidad: number): Promise<boolean> {
    return this.recetaService.validateStock(productoId, cantidad);
  }
}
