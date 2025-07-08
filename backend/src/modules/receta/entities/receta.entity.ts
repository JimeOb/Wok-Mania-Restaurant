import { ProductoEntity } from 'src/modules/producto/entities/producto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('receta')
export class RecetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @Column()
  insumoId: number;

  @Column('decimal')
  cantidadNecesaria: number;

  @ManyToOne(() => ProductoEntity, (p) => p.recetas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productoId' })
  producto: ProductoEntity;
}
