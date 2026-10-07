import BrandPanel from '../components/BrandPanel.jsx';
import LoginForm from '../components/LoginForm.jsx';

/**
 * Pantalla de inicio de sesion con layout split-screen:
 *  - Izquierda (escritorio): panel corporativo de marca.
 *  - Derecha: contenedor centrado con el formulario.
 */
export default function LoginPage({ onLoginExitoso }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <BrandPanel />

      <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:min-h-0">
        <div className="w-full max-w-md">
          <LoginForm onLoginExitoso={onLoginExitoso} />
        </div>
      </main>
    </div>
  );
}
