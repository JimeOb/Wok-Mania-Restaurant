import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateInventarioDto {
  @IsNotEmpty()
  @IsInt()
  insumoId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  cantidad: number;
}
