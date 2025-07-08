/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import pedidoService from '../../api/pedidoService';

export default function ClienteDashboard() {
  const { user } = useAuth();
  const [historial, setHistorial] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      pedidoService.getByCliente(user.id).then(setHistorial);
    }
  }, [user]);

  return (
    <div>
      <h1>Bienvenido, {user?.nombre}</h1>
      <h2>Historial de Pedidos</h2>
      <ul>
        {historial.map(p => (
          <li key={p.id}>
            Pedido #{p.id} – {p.estado} – {new Date(p.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
