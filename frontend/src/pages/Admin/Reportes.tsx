import { useEffect, useState } from 'react';
import reportesService, { type Reporte } from '../../api/reportesService';

export default function Reportes() {
  const [daily, setDaily] = useState<Reporte | null>(null);
  const [weekly, setWeekly] = useState<Reporte | null>(null);
  const [annual, setAnnual] = useState<Reporte | null>(null);

  useEffect(() => {
    reportesService.getDaily().then(setDaily);
    reportesService.getWeekly().then(setWeekly);
    reportesService.getAnnual().then(setAnnual);
  }, []);

  return (
    <div>
      <h1>Reportes</h1>

      <section>
        <h2>Diario</h2>
        {daily
          ? <pre>{JSON.stringify(daily, null, 2)}</pre>
          : <p>Cargando...</p>}
      </section>

      <section>
        <h2>Semanal</h2>
        {weekly
          ? <pre>{JSON.stringify(weekly, null, 2)}</pre>
          : <p>Cargando...</p>}
      </section>

      <section>
        <h2>Anual</h2>
        {annual
          ? <pre>{JSON.stringify(annual, null, 2)}</pre>
          : <p>Cargando...</p>}
      </section>
    </div>
  );
}
