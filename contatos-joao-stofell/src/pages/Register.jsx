import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthScaffold from '../components/AuthScaffold.jsx';
import Notice from '../components/Notice.jsx';
import { cadastrar } from '../services/endpoints.js';
import { apiErrorMessage } from '../services/api.js';
import { normalizeEmail } from '../utils/contacts.js';

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ nome: '', email: '', senha: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function change(event) { setValues((previous) => ({ ...previous, [event.target.name]: event.target.value })); }

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await cadastrar({ nome: values.nome.trim(), email: normalizeEmail(values.email), senha: values.senha });
      navigate('/login', { replace: true, state: { success: 'Conta criada com sucesso! Agora você pode entrar.' } });
    } catch (err) {
      setError(apiErrorMessage(err, 'Não foi possível concluir o cadastro. Confira os dados e tente novamente.'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthScaffold label="PRIMEIRO ACESSO" title="Crie sua conta" description="Falta pouco para começar a organizar seus contatos.">
      <Notice message={error} />
      <form onSubmit={submit} className="stack-form">
        <label htmlFor="register-name">Nome completo</label>
        <input id="register-name" name="nome" placeholder="Como podemos te chamar?" value={values.nome} onChange={change} autoComplete="name" minLength={2} disabled={busy} required />
        <label htmlFor="register-email">E-mail</label>
        <input id="register-email" type="email" name="email" placeholder="nome@exemplo.com" value={values.email} onChange={change} autoComplete="email" disabled={busy} required />
        <label htmlFor="register-password">Senha</label>
        <input id="register-password" type="password" name="senha" placeholder="Crie uma senha" value={values.senha} onChange={change} autoComplete="new-password" disabled={busy} required />
        <button className="btn btn-primary btn-submit" type="submit" disabled={busy}>{busy ? 'Cadastrando...' : 'Criar minha conta'} <span aria-hidden="true">→</span></button>
      </form>
      <p className="form-tail">Já possui cadastro? <Link to="/login">Fazer login</Link></p>
    </AuthScaffold>
  );
}
