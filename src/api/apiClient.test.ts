import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from './apiClient';
import { z } from 'zod';
import { ProductSchema } from '../schemas/product.schemas';

describe('apiClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  const TestSchema = z.object({ ok: z.boolean() });

  it('should call fetch with BASE_URL + endpoint', async () => {
    const mockData = { ok: true };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    await apiClient('/test-endpoint', TestSchema);

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_BASE_URL}/test-endpoint`,
      expect.any(Object)
    );
  });

  it('should call fetch with API_KEY and Content-Type headers', async () => {
    const mockData = { ok: true };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    await apiClient('/test-endpoint', TestSchema);

    // Verificamos que fetch se llamó con la URL y los headers correctos
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        }),
      })
    );
  });

  it('should throw error when request fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(apiClient('/bad-endpoint', TestSchema)).rejects.toThrow(
      'HTTP 404: Not Found'
    );
  });

  it('should return validated data when schema matches', async () => {
    const mockData = {
      id: '1',
      name: 'iPhone 15',
      brand: 'Apple',
      basePrice: 999,
      imageUrl: 'https://example.com/iphone.jpg',
    };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const result = await apiClient('/products/1', ProductSchema);

    expect(result).toEqual(mockData);
    expect(result).toHaveProperty('id', '1');
    expect(result).toHaveProperty('name', 'iPhone 15');
    expect(result).toHaveProperty('basePrice', 999);
  });

  it('should reject invalid data from API (XSS protection)', async () => {
    const invalidData = {
      id: '123',
      name: 'iPhone',
      brand: 'Apple',
      basePrice: 'GRATIS', // ❌ String en lugar de number
      imageUrl: 'javascript:alert("XSS")', // ❌ URL maliciosa
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(invalidData),
    } as Response);

    await expect(apiClient('/products/123', ProductSchema)).rejects.toThrow(
      'Invalid data from API'
    );
  });

  it('should reject negative prices', async () => {
    const invalidData = {
      id: '123',
      name: 'iPhone',
      brand: 'Apple',
      basePrice: -100, // ❌ Precio negativo
      imageUrl: 'https://example.com/image.jpg',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(invalidData),
    } as Response);

    await expect(apiClient('/products/123', ProductSchema)).rejects.toThrow(
      'Invalid data from API'
    );
  });

  it('should reject empty required fields', async () => {
    const invalidData = {
      id: '',  // ❌ ID vacío
      name: 'iPhone',
      brand: '',  // ❌ Brand vacío
      basePrice: 999,
      imageUrl: 'https://example.com/image.jpg',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(invalidData),
    } as Response);

    await expect(apiClient('/products/123', ProductSchema)).rejects.toThrow(
      'Invalid data from API'
    );
  });
});
