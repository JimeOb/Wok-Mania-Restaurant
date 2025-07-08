/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PedidoEntity } from './pedido.entity';

@Entity('detalle_pedido')
export class DetallePedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pedidoId: number;

  @Column()
  productoId: number;

  @Column()
  cantidad: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  observaciones?: string;

  // relación hacia PedidoEntity
  @ManyToOne(() => PedidoEntity, (pedido) => pedido.detalles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pedidoId' })
  pedido: PedidoEntity;
}
