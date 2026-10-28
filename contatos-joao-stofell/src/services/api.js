import axios from 'axios';
import { readToken } from '../utils/session.js';

// As requisições protegidas recebem automaticamente o token JWT.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api-contatos-auth-04-09-25.onrender.com',
  timeout: 25000,
});

api.interceptors.request.use((config) => {
  const jwt = readToken();
  if (jwt) {
    config.headers.set('Authorization', `Bearer ${jwt}`);
  }
  return config;
});

export function apiErrorMessage(error, fallback) {
  if (!axios.isAxiosError(error)) return fallback;
  if (!error.response) {
    return 'Não foi possível acessar o servidor. Confira sua conexão e tente novamente.';
  }
  if (error.response.status >= 500) {
    return 'O servidor está temporariamente indisponível. Tente novamente.';
  }
  return fallback;
}
