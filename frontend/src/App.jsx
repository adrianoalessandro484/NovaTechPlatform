import { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';

/**
 * Componente raiz. Mantiene la sesion simulada en memoria:
 *  - Sin sesion  -> pantalla de inicio de sesion (split-screen).
 *  - Con sesion  -> pantalla de bienvenida tras un 200 OK.
 */
export default function App() {
  const [sesion, setSesion] = useState(null);

  const manejarCierreSesion = () => setSesion(null);

  if (sesion) {
    return <WelcomePage sesion={sesion} onCerrarSesion={manejarCierreSesion} />;
  }

  return <LoginPage onLoginExitoso={setSesion} />;
}
