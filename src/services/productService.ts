import { apiClient } from '../api/apiClient'

export const productService = {
  getAll: () => apiClient('/products'),

  getById: (id: string) => apiClient(`/products/${id}`),

  search: (query: string) => apiClient(`/products?search=${query}`),
}
