/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';
import { CreateAuthDto, UserRole } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly userRepo: Repository<AuthEntity>,
  ) {}

  async createUser(dto: CreateAuthDto): Promise<AuthEntity> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(dto.password, salt);
    const user = this.userRepo.create({
      cedula: dto.cedula,
      nombre: dto.nombre,
      correo: dto.correo,
      rol: dto.role,
      clave: hashed,
    });
    return this.userRepo.save(user);
  }

  async validateUser(
    cedula: string,
    password: string,
    role: UserRole,
  ): Promise<Omit<AuthEntity, 'clave'>> {
    const user = await this.userRepo.findOne({
      where: { cedula, rol: role },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario o rol inválido');
    }

    // Si la clave en BD NO está hasheada (texto plano),
    // hacemos una comparación directa:
    let match: boolean;
    if (!user.clave.startsWith('$2')) {
      // asumiendo que todo hash bcrypt empieza por '$2'
      match = password === user.clave;
    } else {
      // si en algún momento guardas un hash válido, sigue usando bcrypt
      match = await bcrypt.compare(password, user.clave);
    }

    if (!match) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { clave, ...result } = user;
    return result;
  }
}
