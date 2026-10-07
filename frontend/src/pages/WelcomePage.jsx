import { LogOut, ShieldCheck } from 'lucide-react';
import AlertBanner from '../components/AlertBanner.jsx';

/**
 * Pantalla simulada de bienvenida posterior al 200 OK.
 * La API devuelve un mensaje (string); aqui se muestra y se permite cerrar sesion.
 */
export default function WelcomePage({ sesion, onCerrarSesion }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12 sm:px-6">
        <AlertBanner
          variant="success"
          titulo="Autenticacion satisfactoria"
          mensaje={sesion?.mensaje ?? 'Inicio de sesion exitoso. Bienvenido a NovaPortal.'}
        />

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <ShieldCheck className="h-8 w-8 text-brand-600" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Bienvenido a NovaPortal</h1>
          <p className="mt-2 text-sm text-slate-500">
            Acceso concedido a la plataforma corporativa de NovaTech.
          </p>

          <button
            type="button"
            onClick={onCerrarSesion}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Cerrar sesion
          </button>
        </section>
      </div>
    </div>
  );
}
