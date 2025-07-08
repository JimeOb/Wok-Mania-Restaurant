// src/api/recetaService.ts
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export interface RecetaItem {
  id: number;
  recetaId: number;
  insumoId: number;
  cantidadNecesaria: number;
}

export class RecetaService {
  async getItems(productoId: number): Promise<RecetaItem[]> {
    const res = await axios.get<RecetaItem[]>(`${API}/recetas/${productoId}/items`);
    return res.data;
  }
  async createOrUpdate(
    productoId: number,
    items: { insumoId: number; cantidadNecesaria: number }[]
  ): Promise<RecetaItem[]> {
    const res = await axios.post<RecetaItem[]>(
      `${API}/recetas/${productoId}/items`,
      { items }
    );
    return res.data;
  }
}

export default new RecetaService();
