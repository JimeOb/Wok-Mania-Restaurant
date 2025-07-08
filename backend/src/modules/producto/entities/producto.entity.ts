import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecetaEntity } from '../../receta/entities/receta.entity';

@Entity('producto')
export class ProductoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @OneToMany(() => RecetaEntity, (receta) => receta.productoId, {
    cascade: true,
  })
  recetas: RecetaEntity[];
}
