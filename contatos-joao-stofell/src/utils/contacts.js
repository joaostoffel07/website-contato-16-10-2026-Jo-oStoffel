export function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return (parts.length > 1 ? parts[0][0] + parts.at(-1)[0] : parts[0][0]).toUpperCase();
}

export function filterContacts(contacts, text) {
  const query = text.trim().toLocaleLowerCase('pt-BR');
  if (!query) return contacts;
  return contacts.filter(({ nome = '', email = '' }) =>
    `${nome} ${email}`.toLocaleLowerCase('pt-BR').includes(query),
  );
}

export function normalizeEmail(email) { return email.trim().toLocaleLowerCase('pt-BR'); }
