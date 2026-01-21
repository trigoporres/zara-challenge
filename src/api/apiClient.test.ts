import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from './apiClient'

describe('apiClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('should call fetch with BASE_URL + endpoint', async () => {
    const mockData = { ok: true }
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response)

    await apiClient('/test-endpoint')

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_BASE_URL}/test-endpoint`,
      expect.any(Object)
    )
  })

  it('should call fetch with API_KEY and Content-Type headers', async () => {
    const mockData = { ok: true }
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response)

    await apiClient('/test-endpoint')

    // Verificamos que fetch se llamó con la URL y los headers correctos
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        }),
      })
    )
  })

  it('should throw error when request fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response)

    await expect(apiClient('/bad-endpoint')).rejects.toThrow('Request failed')
  })

  it('should return correct data', async () => {
    const mockData = { id: 1, name: 'iPhone 15', price: 999 }
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response)

    const result = await apiClient('/products/1')

    expect(result).toEqual(mockData)
    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('name', 'iPhone 15')
    expect(result).toHaveProperty('price', 999)
  })
})
