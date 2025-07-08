/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../pages/LoginPage.css';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'cliente'|'mesero'|'chef'|'administrador'>('cliente');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn({ cedula, password, rol });
      navigate(`/${rol}`);
    } catch {
      setError('Cédula, contraseña o rol inválidos');
    }
  };

  return (
    <div id="login-root">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        {error && <div className="login-error">{error}</div>}

        <input
          className="login-input"
          placeholder="Cédula"
          value={cedula}
          onChange={e => setCedula(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select
          className="login-select"
          value={rol}
          onChange={e => setRol(e.target.value as any)}
        >
          <option value="cliente">Cliente</option>
          <option value="mesero">Mesero</option>
          <option value="chef">Chef</option>
          <option value="administrador">Administrador</option>
        </select>

        <button className="login-button" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}