// src/api/authService.ts
import axios from 'axios';

const API = "http://localhost:3000"

export interface LoginDto {
  cedula: string;
  password: string;
  rol: string;
}

export interface User {
  id: number;
  cedula: string;
  nombre: string;
  correo: string;
  rol: string;
}

class AuthService {
  async login(dto: LoginDto): Promise<User> {
    const res = await axios.post<{ user: User }>(`${API}/auth/login`, dto);
    return res.data.user;
  }
}

// crea una instancia
const authService = new AuthService();

// exporta la instancia por defecto…
export default authService;

// …y una función nombrada `login` para que puedas hacer:
// import { login } from '.../authService'
export const login = authService.login.bind(authService);
