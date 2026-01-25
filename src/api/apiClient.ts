import { z } from 'zod';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * API client with runtime validation using Zod schemas
 * @param endpoint - API endpoint to call
 * @param schema - Zod schema to validate the response
 * @param options - Fetch options
 * @returns Validated data of type T
 * @throws Error if request fails, times out, or validation fails
 */
export const apiClient = async <T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options: RequestInit = {}
): Promise<T> => {
  // Timeout para evitar requests colgados (30 segundos)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...options.headers,
      },
    });

    // Error más descriptivo con status y endpoint
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${response.statusText} - ${endpoint}`
      );
    }

    const data = await response.json();

    // ✅ VALIDACIÓN CON ZOD - Protege contra datos maliciosos o incorrectos
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Log detallado del error de validación en desarrollo
        if (import.meta.env.DEV) {
          console.error('❌ Invalid API response:', {
            endpoint,
            error: error.toString(),
            receivedData: data,
          });
        }
        throw new Error(`Invalid data from API: ${endpoint}`);
      }
      throw error;
    }
  } catch (error) {
    // Manejo específico de timeout
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout: ${endpoint}`);
    }
    throw error;
  } finally {
    // Limpia el timeout para evitar memory leaks
    clearTimeout(timeoutId);
  }
};
