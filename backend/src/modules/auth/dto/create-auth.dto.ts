/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum UserRole {
  CLIENTE = 'cliente',
  MESERO = 'mesero',
  CHEF = 'chef',
  ADMINISTRADOR = 'administrador',
}

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  cedula: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
