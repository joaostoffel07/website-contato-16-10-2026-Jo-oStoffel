import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notice from '../components/Notice.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { adicionarContato, listarContatos } from '../services/endpoints.js';
import { apiErrorMessage } from '../services/api.js';
import { filterContacts, initials, normalizeEmail } from '../utils/contacts.js';

export default function Contacts() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [contatos, setContatos] = useState([]);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ nome: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const visibleContacts = useMemo(() => filterContacts(contatos, query), [contatos, query]);

  const handleError = useCallback((err, fallback) => {
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      signOut();
      navigate('/login', { replace: true, state: { success: 'Sua sessão terminou. Entre novamente.' } });
      return '';
    }
    return apiErrorMessage(err, fallback);
  }, [navigate, signOut]);

  // Buscas canceladas ao desmontar evitam atualizar o estado após navegar.
  useEffect(() => {
    const controller = new AbortController();
    listarContatos(controller.signal)
      .then((data) => { if (!controller.signal.aborted) { setContatos(data); setError(''); } })
      .catch((err) => { if (!controller.signal.aborted) setError(handleError(err, 'Não foi possível carregar os contatos.')); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [handleError]);

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      setContatos(await listarContatos());
    } catch (err) {
      setError(handleError(err, 'Não foi possível atualizar a lista.'));
    } finally {
      setLoading(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setFormError('');
    setSuccess('');
    setSaving(true);
    try {
      await adicionarContato({ nome: form.nome.trim(), email: normalizeEmail(form.email) });
      setForm({ nome: '', email: '' });
      setSuccess('Contato adicionado à sua agenda.');
      try {
        setContatos(await listarContatos());
        setError('');
      } catch (err) {
        setError(handleError(err, 'O contato foi salvo, mas não foi possível atualizar a lista. Clique em Atualizar.'));
      }
    } catch (err) {
      setFormError(handleError(err, 'Não foi possível adicionar o contato. Tente novamente.'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="dashboard">
      <section className="dashboard-heading">
        <div>
          <div className="eyebrow">SEU ESPAÇO PESSOAL</div>
          <h1>Minha agenda<span className="title-dot">.</span></h1>
          <p>Um lugar para manter suas conexões organizadas.</p>
        </div>
        <div className="stat-pill"><strong>{contatos.length}</strong><span>{contatos.length === 1 ? 'contato salvo' : 'contatos salvos'}</span></div>
      </section>
      <div className="dashboard-grid">
        <section className="list-panel panel" aria-labelledby="list-heading">
          <div className="panel-heading">
            <div><span className="eyebrow">LISTA DE CONTATOS</span><h2 id="list-heading">Todas as pessoas</h2></div>
            <button type="button" className="btn btn-muted" onClick={refresh} disabled={loading || saving}>↻ Atualizar</button>
          </div>
          <label htmlFor="search" className="search-label">Pesquisar na agenda</label>
          <div className="search-box"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Busque pelo nome ou e-mail" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
          {loading ? <div className="loading-msg" role="status">Carregando sua agenda...</div> : error ? <Notice message={error} /> : visibleContacts.length ? (
            <ul className="contacts-list">
              {visibleContacts.map((item, index) => (
                <li className="contact-item" key={item._id ?? `${item.email}-${index}`}>
                  <span className={`contact-avatar avatar-${index % 4}`} aria-hidden="true">{initials(item.nome || '')}</span>
                  <span className="contact-main"><strong>{item.nome}</strong><a href={`mailto:${item.email}`}>{item.email}</a></span>
                  <span className="row-mark" aria-hidden="true">↗</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-contacts"><div className="empty-art" aria-hidden="true">✳</div><h3>{query ? 'Nenhum resultado' : 'Sua lista está vazia'}</h3><p>{query ? 'Tente pesquisar por outro nome ou e-mail.' : 'Comece adicionando seu primeiro contato no formulário ao lado.'}</p></div>
          )}
        </section>

        <aside className="form-panel panel" aria-labelledby="form-heading">
          <div className="form-decor" aria-hidden="true">＋</div>
          <span className="eyebrow">NOVO CADASTRO</span>
          <h2 id="form-heading">Adicionar contato</h2>
          <p>Preencha os dados para salvar um novo contato na agenda.</p>
          <Notice message={formError} />
          <Notice variant="success" message={success} />
          <form className="stack-form" onSubmit={submit}>
            <label htmlFor="contact-name">Nome do contato</label>
            <input id="contact-name" placeholder="Ex.: Maria Silva" value={form.nome} onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))} required disabled={saving} />
            <label htmlFor="contact-email">E-mail</label>
            <input id="contact-email" type="email" placeholder="maria@exemplo.com" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required disabled={saving} />
            <button type="submit" className="btn btn-primary btn-submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar contato'} <span aria-hidden="true">→</span></button>
          </form>
          <div className="form-footnote">Os contatos são vinculados à sua conta na API.</div>
        </aside>
      </div>
    </div>
  );
}
