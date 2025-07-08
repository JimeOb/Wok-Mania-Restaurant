/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import pedidoService, { Canal, type PedidoItemDto } from '../../api/pedidoService';

export default function MeseroDashboard() {
  const [mesaId, setMesaId] = useState<number>(0);
  const [items, setItems] = useState<PedidoItemDto[]>([{ productoId: 0, cantidad: 1 }]);
  const [loading, setLoading] = useState(false);

  const addItem = () => setItems([...items, { productoId: 0, cantidad: 1 }]);
  const updateItem = (idx: number, key: 'productoId' | 'cantidad', value: number) => {
    const next = [...items];
    // @ts-ignore
    next[idx][key] = value;
    setItems(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pedidoService.create({
        canal: Canal.SALON,
        mesaId,
        items,
      });
      alert('Pedido registrado');
      setItems([{ productoId: 0, cantidad: 1 }]);
      setMesaId(0);
    } catch (err: any) {
      alert(err.message || 'Error al registrar pedido');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Dashboard Mesero</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Mesa ID:
          <input
            type="number"
            value={mesaId}
            onChange={e => setMesaId(Number(e.target.value))}
            required
          />
        </label>
        <h2>Items</h2>
        {items.map((it, idx) => (
          <div key={idx}>
            <label>
              Producto:
              <input
                type="number"
                value={it.productoId}
                onChange={e => updateItem(idx, 'productoId', Number(e.target.value))}
                required
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                value={it.cantidad}
                min={1}
                onChange={e => updateItem(idx, 'cantidad', Number(e.target.value))}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addItem}>+ Agregar ítem</button>
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Registrar Pedido'}</button>
      </form>
    </div>
  );
}
