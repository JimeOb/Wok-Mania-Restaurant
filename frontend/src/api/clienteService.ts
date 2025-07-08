/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/clienteService.ts
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export interface CreateClienteDto {
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface UpdateClienteDto {
  nombre?: string;
  telefono?: string;
  direccion?: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
  pedidos?: any[];
}

class ClienteService {
  async create(dto: CreateClienteDto): Promise<Cliente> {
    const res = await axios.post<Cliente>(`${API}/clientes`, dto);
    return res.data;
  }
  async findOne(id: number): Promise<Cliente> {
    const res = await axios.get<Cliente>(`${API}/clientes/${id}`);
    return res.data;
  }
  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    const res = await axios.post<Cliente>(`${API}/clientes/${id}`, dto);
    return res.data;
  }
  async remove(id: number): Promise<void> {
    await axios.delete(`${API}/clientes/${id}`);
  }
  async createOrder(clienteId: number, pedidoDto: any): Promise<any> {
    const res = await axios.post(`${API}/clientes/${clienteId}/pedidos`, pedidoDto);
    return res.data;
  }
  async getOrderHistory(clienteId: number): Promise<any[]> {
    const res = await axios.get<any[]>(`${API}/clientes/${clienteId}/pedidos`);
    return res.data;
  }
}

export default new ClienteService();
