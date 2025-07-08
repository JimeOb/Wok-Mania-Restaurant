import { Controller } from '@nestjs/common';
import { RecetaService } from './receta.service';

@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}
}
