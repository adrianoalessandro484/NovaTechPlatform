import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LogIn, Mail } from 'lucide-react';
import { loginDefaultValues, loginSchema } from '../schemas/loginSchema.js';
import { iniciarSesion } from '../services/authService.js';
import FormTextField from './FormTextField.jsx';
import PasswordField from './PasswordField.jsx';
import AlertBanner from './AlertBanner.jsx';

/**
 * Formulario de validacion de credenciales.
 *
 * Usabilidad aplicada:
 *  - Visibilidad del estado: boton deshabilitado + spinner "Validando credenciales..." (RV-08).
 *  - Prevencion/recuperacion de errores: validacion en tiempo real y banner global (RV-05/RV-06).
 *  - Teclado: el submit responde a la tecla Enter de forma nativa; tabIndex secuencial (E-08).
 */
export default function LoginForm({ onLoginExitoso }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: loginDefaultValues,
  });

  const [mensajeGlobal, setMensajeGlobal] = useState('');

  const correo = watch('correo');
  const clave = watch('clave');

  // Al corregir cualquiera de los campos, se limpia el error global (recuperacion de errores).
  useEffect(() => {
    setMensajeGlobal('');
  }, [correo, clave]);

  const onSubmit = async (datos) => {
    setMensajeGlobal('');
    try {
      const sesion = await iniciarSesion(datos);
      onLoginExitoso?.(sesion);
    } catch (error) {
      setMensajeGlobal(error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
          <span className="text-lg font-black text-white">N</span>
        </div>
        <div className="leading-tight">
          <p className="font-bold text-slate-900">NovaTechPlatform</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">
            NovaPortal
          </p>
        </div>
      </div>

      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Iniciar sesion</h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Ingrese sus credenciales institucionales para acceder al portal.
        </p>
      </header>

      {mensajeGlobal && (
        <div className="mb-5">
          <AlertBanner variant="error" titulo="No se pudo iniciar sesion" mensaje={mensajeGlobal} />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isSubmitting}
        className="space-y-5"
      >
        <FormTextField
          id="correo"
          label="Correo electrónico institucional"
          type="email"
          inputMode="email"
          placeholder="colaborador@novatech.com"
          hint="Use su correo corporativo terminado en @novatech.com."
          autoComplete="username"
          autoFocus
          icono={Mail}
          requerido
          registro={register('correo')}
          error={errors.correo?.message}
          disabled={isSubmitting}
        />

        <PasswordField
          id="clave"
          label="Contrasena"
          registro={register('clave')}
          error={errors.clave?.message}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition
            hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-300
            disabled:cursor-not-allowed disabled:bg-brand-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span>Validando credenciales...</span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" aria-hidden="true" />
              <span>Iniciar sesion</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Uso exclusivo del personal autorizado de NovaTech.
      </p>
    </div>
  );
}
