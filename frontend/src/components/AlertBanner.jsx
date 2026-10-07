import { AlertCircle, CheckCircle2 } from 'lucide-react';

const variantes = {
  error: {
    contenedor: 'border-rose-200 bg-rose-50 text-rose-800',
    Icono: AlertCircle,
    role: 'alert',
    ariaLive: 'assertive',
  },
  success: {
    contenedor: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    Icono: CheckCircle2,
    role: 'status',
    ariaLive: 'polite',
  },
};

/**
 * Banner no intrusivo para feedback global (401/400 -> error, 200 -> exito).
 * Usa role/aria-live para anunciar el cambio a lectores de pantalla.
 */
export default function AlertBanner({ variant = 'error', titulo, mensaje }) {
  const { contenedor, Icono, role, ariaLive } = variantes[variant] ?? variantes.error;

  return (
    <div
      role={role}
      aria-live={ariaLive}
      className={`flex items-start gap-3 rounded-xl border p-3.5 text-sm shadow-sm ${contenedor}`}
    >
      <Icono className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="space-y-0.5">
        {titulo && <p className="font-semibold">{titulo}</p>}
        <p className="leading-snug">{mensaje}</p>
      </div>
    </div>
  );
}
