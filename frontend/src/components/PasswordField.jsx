import { useState } from 'react';
import { AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';

/**
 * Campo de contrasena con control de visibilidad (RF-05 / RV-09).
 * - Por defecto el valor NO se muestra: type="password" (RV-09).
 * - El boton de ojo alterna type="password" / type="text" (RF-05).
 * - Al pasar el mouse o recibir foco, el boton despliega un POPOVER (role="tooltip")
 *   que indica la accion disponible; es accesible por teclado.
 */
export default function PasswordField({ id, label, error, registro, disabled = false }) {
  const [visible, setVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const errorId = `${id}-error`;
  const popoverId = `${id}-popover`;
  const textoAccion = visible ? 'Ocultar contrasena' : 'Mostrar contrasena';

  const mostrarPopover = () => setPopoverVisible(true);
  const ocultarPopover = () => setPopoverVisible(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        <span className="ml-1 text-rose-500" aria-hidden="true">
          *
        </span>
      </label>

      <div className="relative mt-1.5">
        <Lock
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          autoComplete="current-password"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          placeholder="Ingrese su contrasena"
          className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-12 text-sm text-slate-900 shadow-sm transition
            placeholder:text-slate-400
            disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500
            ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
            }`}
          {...registro}
        />

        <button
          type="button"
          onClick={() => setVisible((valor) => !valor)}
          onMouseEnter={mostrarPopover}
          onMouseLeave={ocultarPopover}
          onFocus={mostrarPopover}
          onBlur={ocultarPopover}
          disabled={disabled}
          aria-label={textoAccion}
          aria-pressed={visible}
          aria-controls={id}
          aria-describedby={popoverVisible ? popoverId : undefined}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 text-slate-400 transition hover:text-slate-600 focus-visible:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}

          {popoverVisible && (
            <span
              id={popoverId}
              role="tooltip"
              className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-max max-w-[13rem] rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg"
            >
              {textoAccion}
              <span
                aria-hidden="true"
                className="absolute right-3 top-full h-2 w-2 -translate-y-1 rotate-45 bg-slate-900"
              />
            </span>
          )}
        </button>
      </div>

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
