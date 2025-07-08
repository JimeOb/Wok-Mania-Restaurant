import { useEffect, useState } from 'react';
import inventarioService, { type Inventario } from '../../api/inventarioService';
import type { CreateInventarioDto, UpdateInventarioDto } from '../../api/inventarioService';

export default function InventarioManager() {
  const [lista, setLista] = useState<Inventario[]>([]);
  const [nuevo, setNuevo] = useState<CreateInventarioDto>({ insumoId: 0, cantidad: 0 });
  const [editando, setEditando] = useState<Inventario | null>(null);

  const cargar = () => {
    inventarioService.findAll().then(setLista);
  };
  useEffect(cargar, []);

  const crear = async () => {
    await inventarioService.create(nuevo);
    setNuevo({ insumoId: 0, cantidad: 0 });
    cargar();
  };

  const guardar = async () => {
    if (!editando) return;
    const dto: UpdateInventarioDto = { cantidad: editando.cantidad };
    await inventarioService.update(editando.id, dto);
    setEditando(null);
    cargar();
  };

  return (
    <div>
      <h1>Gestor de Inventario</h1>
      <h2>Nuevo Registro</h2>
      <label>
        Insumo ID:
        <input
          type="number"
          value={nuevo.insumoId}
          onChange={e => setNuevo({ ...nuevo, insumoId: Number(e.target.value) })}
        />
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          value={nuevo.cantidad}
          onChange={e => setNuevo({ ...nuevo, cantidad: Number(e.target.value) })}
        />
      </label>
      <button onClick={crear}>Crear</button>

      <h2>Lista de Inventario</h2>
      <ul>
        {lista.map(item => (
          <li key={item.id}>
            [{item.id}] Insumo {item.insumoId} → {item.cantidad}
            <button onClick={() => setEditando(item)}>Editar</button>
            <button onClick={() => inventarioService.remove(item.id).then(cargar)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>

      {editando && (
        <div>
          <h3>Editando #{editando.id}</h3>
          <label>
            Cantidad:
            <input
              type="number"
              value={editando.cantidad}
              onChange={e => setEditando({ ...editando, cantidad: Number(e.target.value) })}
            />
          </label>
          <button onClick={guardar}>Guardar</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
