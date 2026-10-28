import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterContacts, initials, normalizeEmail } from './contacts.js';

test('gera iniciais para nomes simples e compostos', () => {
  assert.equal(initials('João Stofell'), 'JS');
  assert.equal(initials('Ana'), 'A');
  assert.equal(initials(' '), '?');
});

test('busca contatos pelo nome ou e-mail ignorando maiúsculas', () => {
  const contatos = [
    { nome: 'Marina Costa', email: 'marina@exemplo.com' },
    { nome: 'Pedro Lima', email: 'pedro@exemplo.com' },
  ];
  assert.deepEqual(filterContacts(contatos, ' MARINA '), [contatos[0]]);
  assert.deepEqual(filterContacts(contatos, 'PEDRO@'), [contatos[1]]);
  assert.deepEqual(filterContacts(contatos, ''), contatos);
  assert.deepEqual(filterContacts(contatos, 'não existe'), []);
});

test('normaliza e-mails antes de enviar à API', () => {
  assert.equal(normalizeEmail('  NOME@EXEMPLO.COM '), 'nome@exemplo.com');
});
