# Minha Agenda — Projeto de João Stofell

Aplicação React Web de gerenciamento de contatos com autenticação JWT, construída como uma **segunda versão visual e estrutural** da atividade **Contatos com Autenticação (React + JWT)**.

## O que a aplicação faz?

1. **Cadastrar:** envia nome, e-mail e senha para `POST /usuarios/registrar`.
2. **Entrar:** envia e-mail e senha para `POST /usuarios/login`.
3. **Guardar sessão:** armazena o JWT recebido no `localStorage`, e usa Context API para compartilhar o estado de autenticação.
4. **Restringir acesso:** a rota `/contatos` exige autenticação; visitantes são enviados a `/login`.
5. **Enviar token:** o interceptor Axios anexa `Authorization: Bearer <token>` às requisições autenticadas.
6. **Consultar contatos:** `GET /contatos` recupera a lista do usuário conectado.
7. **Criar contatos:** `POST /contatos` cadastra `{ nome, email }` e atualiza a lista.
8. **Sair:** apaga o token e redireciona ao login.

Também inclui pesquisa local na lista, mensagens de erro, carregamento, layout responsivo e tratamento de sessão rejeitada pelo servidor.

## Como executar

É necessário **Node.js 20.19+** (recomenda-se Node 22) e npm.

```bash
npm install
npm run dev
```

Abra a URL indicada pelo Vite (normalmente `http://localhost:5173`).

### Configuração da API

A API da atividade é utilizada automaticamente:

```
https://api-contatos-auth-04-09-25.onrender.com
```

Para modificá-la, copie `.env.example` para `.env.local` e configure `VITE_API_URL`. Reinicie o Vite após alterar o arquivo.

**Importante:** a API precisa estar disponível e permitir chamadas CORS da origem em que o site for executado. Não inclua senhas, chaves privadas ou segredos em variáveis `VITE_`, pois elas ficam acessíveis no navegador.

## Scripts disponíveis

```bash
npm run dev     # ambiente local
npm run build   # compilação de produção
npm run preview # visualização do build
npm test        # testes das funções de busca e formatação
```

## Estrutura

```
public/favicon.svg
src/
  components/      # Header, proteção de rotas, layout e feedback
  context/         # AuthContext com login/logout
  pages/           # Login, Register, Contacts
  services/        # Axios, endpoints da API e erros
  utils/           # Token/localStorage e utilitários de contatos
  App.jsx          # Rotas React Router
  main.jsx         # Montagem do app
  styles.css       # Identidade visual responsiva
```

## Observações de segurança

- O `localStorage` é usado para o JWT por exigência didática do enunciado, mas tokens acessíveis a JavaScript podem ser comprometidos por XSS. Em produção, avalie cookies `HttpOnly`, `Secure`, `SameSite` e defesa CSRF conforme a arquitetura.
- Esconder a rota no React **não substitui autenticação/autorização no backend**. O servidor deve verificar o JWT e a identidade do usuário em cada operação de contato.
- Ao receber 401/403 nas chamadas da agenda, o site encerra a sessão local.

---

**Identificação do projeto:** João Stofell.
