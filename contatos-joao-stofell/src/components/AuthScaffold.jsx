export default function AuthScaffold({ label, title, description, children }) {
  return (
    <div className="auth-grid">
      <section className="auth-aside" aria-label="Apresentação da agenda">
        <div className="aside-label"><span className="pulse"></span> SIMPLES. PESSOAL. ORGANIZADO.</div>
        <h1>As pessoas certas, <em>sempre por perto.</em></h1>
        <p>Sua lista de contatos em um espaço feito para o que importa: manter boas conexões.</p>
        <div className="decorative-card" aria-hidden="true">
          <div className="contact-preview">
            <span className="preview-avatar one">JS</span>
            <span className="preview-copy"><i></i><i></i></span>
            <span className="preview-circle">✓</span>
          </div>
          <div className="contact-preview">
            <span className="preview-avatar two">MC</span>
            <span className="preview-copy"><i></i><i></i></span>
            <span className="preview-circle">✓</span>
          </div>
          <div className="preview-caption">Sua agenda, sempre à mão.</div>
        </div>
        <div className="aside-number">01 / CONTATOS</div>
      </section>
      <section className="auth-panel" aria-labelledby="auth-title">
        <span className="eyebrow">{label}</span>
        <h2 id="auth-title">{title}</h2>
        <p className="section-description">{description}</p>
        {children}
      </section>
    </div>
  );
}
