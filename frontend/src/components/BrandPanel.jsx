import { Building2, ShieldCheck, Sparkles } from 'lucide-react';

const beneficios = [
  {
    icono: ShieldCheck,
    titulo: 'Acceso seguro',
    descripcion: 'Autenticacion cifrada y buenas practicas de seguridad corporativa.',
  },
  {
    icono: Building2,
    titulo: 'Plataforma corporativa',
    descripcion: 'Un unico punto de acceso para todas las herramientas internas de NovaTech.',
  },
  {
    icono: Sparkles,
    titulo: 'Experiencia optimizada',
    descripcion: 'Interfaz clara, accesible y disenada para el trabajo diario.',
  },
];

/**
 * Panel visual corporativo (lado izquierdo del layout split-screen).
 * Se oculta en pantallas pequenas para priorizar el formulario.
 */
export default function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl"
      />

      <header className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <span className="text-xl font-black text-white">N</span>
        </div>
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight text-white">NovaTechPlatform</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
            NovaPortal
          </p>
        </div>
      </header>

      <div className="relative max-w-md">
        <h1 className="text-3xl font-extrabold leading-tight text-white xl:text-4xl">
          Bienvenido a NovaPortal
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-100">
          Gestiona tu jornada, tus proyectos y tus recursos desde un solo lugar. Ingresa con
          tus credenciales institucionales para continuar.
        </p>

        <ul className="mt-10 space-y-6">
          {beneficios.map(({ icono: Icono, titulo, descripcion }) => (
            <li key={titulo} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Icono className="h-5 w-5 text-brand-100" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{titulo}</p>
                <p className="text-sm text-brand-200">{descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="relative text-xs text-brand-300">
        &copy; {new Date().getFullYear()} NovaTech. Todos los derechos reservados.
      </footer>
    </aside>
  );
}
