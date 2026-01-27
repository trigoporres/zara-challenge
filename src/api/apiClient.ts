import { z } from 'zod';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const apiClient = async <T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options: RequestInit = {},
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 200000);

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

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${response.statusText} - ${endpoint}`,
      );
    }

    const data = await response.json();

    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
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
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout: ${endpoint}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
