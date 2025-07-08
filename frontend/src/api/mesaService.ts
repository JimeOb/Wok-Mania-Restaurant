// src/api/mesaService.ts
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

// Si tu entidad Mesa sólo tiene id, número y estado:
export interface Mesa {
  id: number;
  numero: number;
  estado: 'libre' | 'ocupada' | 'en-limpieza'; // ajústalo a tu enum real
}

export interface CreateMesaDto {
  numero: number;
}

export interface UpdateMesaDto {
  numero?: number;
  estado?: Mesa['estado'];
}

class MesaService {
  async create(dto: CreateMesaDto): Promise<Mesa> {
    const res = await axios.post<Mesa>(`${API}/mesa`, dto);
    return res.data;
  }

  async findAll(): Promise<Mesa[]> {
    const res = await axios.get<Mesa[]>(`${API}/mesa`);
    return res.data;
  }

  async findOne(id: number): Promise<Mesa> {
    const res = await axios.get<Mesa>(`${API}/mesa/${id}`);
    return res.data;
  }

  async update(id: number, dto: UpdateMesaDto): Promise<Mesa> {
    const res = await axios.patch<Mesa>(`${API}/mesa/${id}`, dto);
    return res.data;
  }

  async remove(id: number): Promise<void> {
    await axios.delete(`${API}/mesa/${id}`);
  }
}

export default new MesaService();
