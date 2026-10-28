import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import { GuestOnly, RequireAuth } from './components/Guard.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Contacts from './pages/Contacts.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="site-main wrap">
          <Routes>
            <Route path="/" element={<Navigate to="/contatos" replace />} />
            <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
            <Route path="/registrar" element={<GuestOnly><Register /></GuestOnly>} />
            <Route element={<RequireAuth />}>
              <Route path="/contatos" element={<Contacts />} />
            </Route>
            <Route path="*" element={<Navigate to="/contatos" replace />} />
          </Routes>
        </main>
        <footer className="footer wrap"><span>Minha Agenda — React + JWT</span><span>Projeto acadêmico | João Stofell</span></footer>
      </BrowserRouter>
    </AuthProvider>
  );
}
