import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventario')
export class InventarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  insumoId: number;

  @Column('decimal')
  cantidad: number;
}
