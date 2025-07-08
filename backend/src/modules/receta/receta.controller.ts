import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaItemEntity } from './entities/receta-item.entity';

@Controller('recetas')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Get(':productoId/items')
  getItems(
    @Param('productoId', ParseIntPipe) productoId: number,
  ): Promise<RecetaItemEntity[]> {
    return this.recetaService.getItemsByProducto(productoId);
  }

  @Post(':productoId/items')
  createOrUpdate(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body('items')
    items: { insumoId: number; cantidadNecesaria: number }[],
  ) {
    return this.recetaService.createOrUpdateRecipe(productoId, items);
  }
}
