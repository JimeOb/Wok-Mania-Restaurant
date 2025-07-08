// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ClienteDashboard from './pages/Cliente/ClienteDashboard';
import MeseroDashboard from './pages/Mesero/MeseroDashboard';
import MesasOcupadas from './pages/Mesero/MesasOcupadas';
import ColaPedidos from './pages/Chef/ColaPedidos';
import InventarioManager from './pages/Admin/InventarioManager';
import Reportes from './pages/Admin/Reportes';
import { useAuth } from './contexts/AuthContext';

// Protected route wrapper
function Protected({ children, roles }: { children: React.ReactNode; roles: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (!roles.includes(user.rol)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Root and Login both render the login form */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Cliente routes */}
          <Route
            path="/cliente"
            element={
              <Protected roles={[ 'cliente' ]}>
                <ClienteDashboard />
              </Protected>
            }
          />

          {/* Mesero routes */}
          <Route
            path="/mesero"
            element={
              <Protected roles={[ 'mesero' ]}>
                <>
                  <MeseroDashboard />
                  <MesasOcupadas />
                </>
              </Protected>
            }
          />

          {/* Chef routes */}
          <Route
            path="/chef"
            element={
              <Protected roles={[ 'chef' ]}>
                <ColaPedidos />
              </Protected>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <Protected roles={[ 'administrador' ]}>
                <>
                  <InventarioManager />
                  <Reportes />
                </>
              </Protected>
            }
          />

          {/* Fallback to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
