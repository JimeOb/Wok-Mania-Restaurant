// src/api/inventarioService.ts
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export interface Inventario {
  id: number;
  insumoId: number;
  cantidad: number;
}

export interface CreateInventarioDto {
  insumoId: number;
  cantidad: number;
}

export interface UpdateInventarioDto {
  insumoId?: number;
  cantidad?: number;
}

class InventarioService {
  async create(dto: CreateInventarioDto): Promise<Inventario> {
    const res = await axios.post<Inventario>(`${API}/inventario`, dto);
    return res.data;
  }
  async findAll(): Promise<Inventario[]> {
    const res = await axios.get<Inventario[]>(`${API}/inventario`);
    return res.data;
  }
  async findOne(id: number): Promise<Inventario> {
    const res = await axios.get<Inventario>(`${API}/inventario/${id}`);
    return res.data;
  }
  async update(id: number, dto: UpdateInventarioDto): Promise<Inventario> {
    const res = await axios.put<Inventario>(`${API}/inventario/${id}`, dto);
    return res.data;
  }
  async remove(id: number): Promise<void> {
    await axios.delete(`${API}/inventario/${id}`);
  }
  
  // métodos internos ya no son necesarios en frontend
}

export default new InventarioService();
