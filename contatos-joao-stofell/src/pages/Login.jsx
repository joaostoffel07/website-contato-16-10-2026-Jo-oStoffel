import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthScaffold from '../components/AuthScaffold.jsx';
import Notice from '../components/Notice.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { entrar } from '../services/endpoints.js';
import { apiErrorMessage } from '../services/api.js';
import { normalizeEmail } from '../utils/contacts.js';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const jwt = await entrar(normalizeEmail(email), senha);
      signIn(jwt);
      const redirect = location.state?.from;
      navigate(typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/contatos', { replace: true });
    } catch (err) {
      setError(apiErrorMessage(err, 'E-mail ou senha incorretos. Verifique seus dados.'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthScaffold label="BEM-VINDO(A) DE VOLTA" title="Entre na sua conta" description="Acesse sua agenda informando o e-mail e a senha cadastrados.">
      <Notice variant="success" message={location.state?.success} />
      <Notice message={error} />
      <form onSubmit={submit} className="stack-form">
        <label htmlFor="login-email">Seu e-mail</label>
        <input id="login-email" type="email" placeholder="nome@exemplo.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} required />
        <label htmlFor="login-senha">Senha</label>
        <input id="login-senha" type="password" placeholder="Digite sua senha" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={busy} required />
        <button className="btn btn-primary btn-submit" disabled={busy} type="submit">{busy ? 'Entrando...' : 'Entrar na agenda'} <span aria-hidden="true">→</span></button>
      </form>
      <p className="form-tail">Ainda não tem cadastro? <Link to="/registrar">Criar uma conta</Link></p>
    </AuthScaffold>
  );
}
