import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../dto/create-auth.dto';

@Entity('usuario')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cedula: string;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column({ name: 'clave' })
  clave: string;

  @Column({ type: 'enum', enum: UserRole })
  rol: UserRole;
}
