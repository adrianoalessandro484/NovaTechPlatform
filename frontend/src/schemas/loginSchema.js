import { z } from 'zod';

/**
 * Dominio del correo institucional de NovaTech.
 * El correo válido debe terminar en @novatech.com (no .pe ni otros dominios).
 */
export const DOMINIO_INSTITUCIONAL = 'novatech.com';

/**
 * Esquema de validación del formulario de inicio de sesión.
 * - Correo: obligatorio, se aplica trim() antes de validar; formato válido y
 *   dominio institucional @novatech.com. Si el dominio es distinto, se advierte.
 * - Clave: obligatoria, longitud mínima de 8 caracteres.
 */
export const loginSchema = z.object({
  correo: z
    .string({ required_error: 'El correo electrónico institucional es obligatorio.' })
    .trim()
    .min(1, 'El correo electrónico institucional es obligatorio.')
    .email('Ingrese un correo electrónico válido (ej. colaborador@novatech.com).')
    .refine((valor) => valor.toLowerCase().endsWith(`@${DOMINIO_INSTITUCIONAL}`), {
      message:
        'Este no es un correo institucional. Debe usar su correo @novatech.com (no se aceptan otros dominios como gmail, hotmail o .pe).',
    }),
  clave: z
    .string({ required_error: 'La contraseña es obligatoria.' })
    .min(1, 'La contraseña es obligatoria.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
});

/**
 * Valores iniciales del formulario.
 */
export const loginDefaultValues = {
  correo: '',
  clave: '',
};
