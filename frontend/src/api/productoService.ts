/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/productoService.ts
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  recetas?: any[];
}

export interface CreateProductoDto {
  nombre: string;
  precio: number;
}

export interface UpdateProductoDto {
  nombre?: string;
  precio?: number;
}

export enum Canal {
  SALON = 'salon',
  LINEA = 'linea',
}

class ProductoService {
  async create(dto: CreateProductoDto): Promise<Producto> {
    const res = await axios.post<Producto>(`${API}/producto`, dto);
    return res.data;
  }
  async findAll(): Promise<Producto[]> {
    const res = await axios.get<Producto[]>(`${API}/producto`);
    return res.data;
  }
  async findOne(id: number): Promise<Producto> {
    const res = await axios.get<Producto>(`${API}/producto/${id}`);
    return res.data;
  }
  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const res = await axios.put<Producto>(`${API}/producto/${id}`, dto);
    return res.data;
  }
  async remove(id: number): Promise<void> {
    await axios.delete(`${API}/producto/${id}`);
  }
  // chequeo de stock vía recetaService si lo necesitas en frontend
}

export default new ProductoService();
