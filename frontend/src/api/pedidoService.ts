// src/api/pedidoService.ts
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// — exporta este interface
export interface PedidoItemDto {
  productoId: number;
  cantidad: number;
}

// si usas más tipos, expórtalos también
export enum Canal {
  SALON = 'salon',
  LINEA = 'linea',
}

export interface CreatePedidoDto {
  canal:    Canal;
  clienteId?: number;
  mesaId?:    number;
  items:    PedidoItemDto[];
}

export interface Pedido {
  id: number
  canal: 'salon' | 'linea'
  clienteId?: number
  mesaId?: number
  estado: 'registrado' | 'preparacion' | 'listo' | 'finalizado'
  fecha: string
  detalles: PedidoItemDto[]
}

export enum EstadoPedido {
  REGISTRADO   = 'registrado',
  PREPARACION  = 'preparacion',
  LISTO        = 'listo',
  FINALIZADO   = 'finalizado',
}

// …resto de tus tipos…

class PedidoService {
  async create(dto: CreatePedidoDto) {
    const { data } = await axios.post(`${API_URL}/pedidos`, dto);
    return data;
  }
  async getByCliente(clienteId: number) {
    const { data } = await axios.get(`${API_URL}/pedidos/cliente/${clienteId}`);
    return data;
  }
  async updateEstado(id: number, estado: EstadoPedido) {
    const { data } = await axios.post(`${API_URL}/pedidos/${id}/estado`, { estado });
    return data;
  }
}

export default new PedidoService();
