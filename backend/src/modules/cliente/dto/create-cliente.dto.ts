import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  direccion: string;
}
