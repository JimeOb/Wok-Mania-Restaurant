import { useEffect, useState } from 'react';
import pedidoService, {
  type Pedido,
  EstadoPedido,
} from '../../api/pedidoService';

export default function ColaPedidos() {
  const [cola, setCola] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pedidoService
      .getByCliente(0) // ajusta al endpoint que corresponda
      .then((list) => {
        // filtramos solo los que estén en REGISTRADO o PREPARACION
        setCola(
          list.filter(
            (p: { estado: EstadoPedido; }) =>
              p.estado === EstadoPedido.REGISTRADO ||
              p.estado === EstadoPedido.PREPARACION
          )
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const avanzar = async (pedidoId: number) => {
    const p = cola.find((x) => x.id === pedidoId);
    if (!p) return;

    // 1) Declaramos explícitamente el tipo
    let nextEstado!: EstadoPedido;

    // 2) Usamos un switch para cubrir solo los casos permitidos
    switch (p.estado) {
      case EstadoPedido.REGISTRADO:
        nextEstado = EstadoPedido.PREPARACION;
        break;
      case EstadoPedido.PREPARACION:
        nextEstado = EstadoPedido.LISTO;
        break;
      default:
        // si ya está LISTO o FINALIZADO, no hacemos nada
        return;
    }

    // 3) Llamamos al servicio con el enum puro
    const actualizado = await pedidoService.updateEstado(
      pedidoId,
      nextEstado
    );

    // 4) Actualizamos el estado local
    setCola((old) =>
      old.map((x) =>
        x.id === pedidoId ? { ...x, estado: actualizado.estado } : x
      )
    );
  };

  if (loading) return <p>Cargando cola…</p>;
  return (
    <div>
      <h1>Pedidos en Cola</h1>
      {cola.map((p) => (
        <div
          key={p.id}
          style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}
        >
          <p>
            Pedido #{p.id} – Cantidad ítems: {p.detalles.length}
          </p>
          <p>Estado: {p.estado}</p>
          <button onClick={() => avanzar(p.id)}>
            {p.estado === EstadoPedido.REGISTRADO
              ? 'Pasar a Preparación'
              : p.estado === EstadoPedido.PREPARACION
              ? 'Marcar Listo'
              : '—'}
          </button>
        </div>
      ))}
    </div>
  );
}
