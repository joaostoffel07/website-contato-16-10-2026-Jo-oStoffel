export const TOKEN_KEY = 'token';

export function readToken() {
  try { return window.localStorage.getItem(TOKEN_KEY) || null; }
  catch { return null; }
}

export function saveToken(token) {
  if (typeof token !== 'string' || !token.trim()) {
    throw new Error('Token de autenticação inválido.');
  }
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}
