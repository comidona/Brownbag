/**
 * API Helper - Wrapper de fetch con manejo de errores
 * Copiar este archivo a src/services/ cuando se necesite
 */

const DEFAULT_TIMEOUT = 10000;

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `Error ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchWithError<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if ((error as Error).name === 'AbortError') {
      throw new Error(`La solicitud excedió el tiempo límite (${timeout}ms)`);
    }
    throw new Error(`Error de red: ${(error as Error).message}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Crea un servicio API con base URL preconfigurada
 */
export function createApiService(baseUrl: string) {
  return {
    get: <T>(endpoint: string, options?: FetchOptions) =>
      fetchWithError<T>(`${baseUrl}${endpoint}`, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      fetchWithError<T>(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...options?.headers },
        body: JSON.stringify(body),
      }),

    put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      fetchWithError<T>(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...options?.headers },
        body: JSON.stringify(body),
      }),

    delete: <T>(endpoint: string, options?: FetchOptions) =>
      fetchWithError<T>(`${baseUrl}${endpoint}`, { ...options, method: 'DELETE' }),
  };
}
