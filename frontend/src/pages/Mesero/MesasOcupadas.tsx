/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import mesaService, { type Mesa } from '../../api/mesaService';

export default function MesasOcupadas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mesaService.findAll().then((data: any[]) => {
      setMesas(data.filter(m => m.estado === 'ocupada'));
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando mesas ocupadas…</p>;
  return (
    <div>
      <h2>Mesas Ocupadas</h2>
      <ul>
        {mesas.map(m => (
          <li key={m.id}>
            Mesa #{m.numero} – Estado: {m.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}
