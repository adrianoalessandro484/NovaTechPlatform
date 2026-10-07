const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5180';

/**
 * Cliente HTTP del endpoint POST /api/auth/login.
 * Traduce la respuesta del backend a un objeto de sesion o lanza un Error
 * con un mensaje seguro y comprensible para el usuario.
 */
export async function iniciarSesion({ correo, clave }) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, clave }),
    });
  } catch {
    const error = new Error(
      'No se pudo conectar con el servidor. Verifique su conexion e intente nuevamente.',
    );
    error.tipo = 'red';
    throw error;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const mensaje =
      payload?.mensaje ??
      payload?.detail ??
      payload?.title ??
      'No fue posible iniciar sesion. Intente nuevamente.';

    const error = new Error(mensaje);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export { API_BASE_URL };
