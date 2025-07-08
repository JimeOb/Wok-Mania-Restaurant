/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RecetaEntity } from './receta.entity';

@Entity('receta_item')
export class RecetaItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // FK hacia la receta (producto)
  @Column()
  recetaId: number;

  // FK hacia insumo
  @Column()
  insumoId: number;

  // Cantidad necesaria de este insumo para el plato
  @Column('decimal')
  cantidadNecesaria: number;

  @ManyToOne(() => RecetaEntity, (receta) => receta.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recetaId' })
  receta: RecetaEntity;
}
