// src/api/reportesService.ts
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export interface Reporte {
  fecha: string;
  totalPedidos: number;
  totalIngresos: number;
  // otros campos según tu backend
}

class ReportesService {
  async getDaily(): Promise<Reporte> {
    const res = await axios.get<Reporte>(`${API}/admin/reportes/daily`);
    return res.data;
  }
  async getWeekly(): Promise<Reporte> {
    const res = await axios.get<Reporte>(`${API}/admin/reportes/weekly`);
    return res.data;
  }
  async getAnnual(): Promise<Reporte> {
    const res = await axios.get<Reporte>(`${API}/admin/reportes/annual`);
    return res.data;
  }
}

export default new ReportesService();
