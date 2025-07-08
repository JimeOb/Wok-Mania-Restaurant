/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoEntity } from '../../pedido/entities/pedido.entity';

@Entity('cliente')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 200 })
  direccion: string;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.cliente)
  pedidos: PedidoEntity[];
}
