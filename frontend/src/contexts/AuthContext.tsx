/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { login, type User, type LoginDto } from '../api/authService';

type AuthContextType = {
  user: User | null;
  signIn: (dto: LoginDto) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (dto: LoginDto) => {
    const u = await login(dto);
    setUser(u);
  };
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
