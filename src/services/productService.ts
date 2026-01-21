import { apiClient } from '../api/apiClient'

export const productService = {
  getAll: () => apiClient('/products?limit=20'),

  getById: (id: string) => apiClient(`/products/${id}`),

  search: (query: string) => apiClient(`/products?search=${query}`),
}
