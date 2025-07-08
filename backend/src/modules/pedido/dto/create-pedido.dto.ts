import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Canal {
  SALON = 'salon',
  LINEA = 'linea',
}

export class PedidoItemDto {
  @IsInt()
  productoId: number;

  @IsInt()
  cantidad: number;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsEnum(Canal)
  canal: Canal;

  @IsInt()
  clienteId?: number;

  @IsInt()
  mesaId?: number;

  @ValidateNested({ each: true })
  @Type(() => PedidoItemDto)
  @ArrayMinSize(1)
  items: PedidoItemDto[];
}
