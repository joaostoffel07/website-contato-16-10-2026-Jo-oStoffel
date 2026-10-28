import { api } from './api.js';

export async function entrar(email, senha) {
  const { data } = await api.post('/usuarios/login', { email, senha });
  if (typeof data?.token !== 'string' || !data.token.trim()) {
    throw new Error('A API não retornou um token válido.');
  }
  return data.token;
}

export async function cadastrar({ nome, email, senha }) {
  await api.post('/usuarios/registrar', { nome, email, senha });
}

export async function listarContatos(signal) {
  const { data } = await api.get('/contatos', { signal });
  if (!Array.isArray(data)) throw new Error('A API retornou uma lista de contatos inesperada.');
  return data;
}

export async function adicionarContato({ nome, email }) {
  await api.post('/contatos', { nome, email });
}
