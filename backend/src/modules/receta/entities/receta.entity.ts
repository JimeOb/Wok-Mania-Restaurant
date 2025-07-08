/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { RecetaItemEntity } from './receta-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

@Entity('receta')
export class RecetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Cada receta pertenece a un único producto
  @Column()
  productoId: number;

  // Una receta tiene múltiples insumos
  @OneToMany(() => RecetaItemEntity, (item) => item.receta, { cascade: true })
  items: RecetaItemEntity[];
}
