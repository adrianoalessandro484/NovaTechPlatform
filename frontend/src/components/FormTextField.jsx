import { AlertCircle } from 'lucide-react';

/**
 * Campo de texto accesible y reutilizable.
 * - label asociado mediante htmlFor/id.
 * - aria-invalid y aria-describedby apuntando al mensaje de error.
 * - Mensaje de error inmediatamente debajo del campo (RV-05/RV-06).
 */
export default function FormTextField({
  id,
  label,
  error,
  hint,
  registro,
  icono: Icono,
  requerido = false,
  ...props
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const descritoPor = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {requerido && (
          <span className="ml-1 text-rose-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative mt-1.5">
        {Icono && (
          <Icono
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={descritoPor}
          className={`w-full rounded-lg border bg-white py-2.5 text-sm text-slate-900 shadow-sm transition
            placeholder:text-slate-400
            disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500
            ${Icono ? 'pl-10' : 'pl-3'} pr-3
            ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
            }`}
          {...props}
          {...registro}
        />
      </div>

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-sm text-rose-600"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
