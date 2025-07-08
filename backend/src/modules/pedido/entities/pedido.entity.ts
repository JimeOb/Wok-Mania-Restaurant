/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DetallePedidoEntity } from './detalle-pedido.entity';
import { Canal } from '../dto/create-pedido.dto';
import { ClienteEntity } from 'src/modules/cliente/entities/cliente.entity';

export enum EstadoPedido {
  REGISTRADO = 'registrado',
  PREPARACION = 'preparacion',
  LISTO = 'listo',
  FINALIZADO = 'finalizado',
}

@Entity('pedido')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Canal })
  canal: Canal;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'clienteId' })
  cliente: ClienteEntity;

  @Column({ nullable: true })
  clienteId: number;

  @Column({ nullable: true })
  mesaId: number;

  @Column({
    type: 'enum',
    enum: EstadoPedido,
    default: EstadoPedido.REGISTRADO,
  })
  estado: EstadoPedido;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha: Date;

  @OneToMany(() => DetallePedidoEntity, (d) => d.pedido, { cascade: true })
  detalles: DetallePedidoEntity[];
}
