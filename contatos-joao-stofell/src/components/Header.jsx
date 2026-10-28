import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { token, signOut } = useAuth();
  const navigate = useNavigate();
  function logout() {
    signOut();
    navigate('/login', { replace: true });
  }

  return (
    <header className="site-header">
      <nav className="header-inner wrap" aria-label="Menu principal">
        <Link className="brand" to={token ? '/contatos' : '/login'} aria-label="Minha Agenda, página inicial">
          <span className="brand-symbol" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>minha<span className="brand-strong">agenda</span><span className="brand-accent">.</span></span>
        </Link>
        <div className="top-nav">
          {token ? (
            <>
              <NavLink className="top-link" to="/contatos">Meus contatos</NavLink>
              <button type="button" className="btn btn-header" onClick={logout}>Sair da conta <span aria-hidden="true">↗</span></button>
            </>
          ) : (
            <>
              <NavLink className="top-link" to="/login">Entrar</NavLink>
              <Link to="/registrar" className="btn btn-header">Criar conta <span aria-hidden="true">↗</span></Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
