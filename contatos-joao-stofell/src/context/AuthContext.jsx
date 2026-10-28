import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { clearToken, readToken, saveToken } from '../utils/session.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);

  const signIn = useCallback((jwt) => {
    saveToken(jwt);
    setToken(jwt);
  }, []);

  const signOut = useCallback(() => {
    clearToken();
    setToken(null);
  }, []);

  // Mantém as abas sincronizadas quando uma delas realiza logout.
  useEffect(() => {
    function onStorage(event) {
      if (event.key === 'token' || event.key === null) setToken(readToken());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(() => ({ token, signIn, signOut }), [token, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider deve envolver a aplicação.');
  return context;
}
