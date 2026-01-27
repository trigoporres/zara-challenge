import { apiClient } from '../api/apiClient';

import {
  ProductsArraySchema,
  ProductDetailSchema,
  type Product,
  type ProductDetail,
} from '../schemas/product.schemas';

export const productService = {
  getAll: (): Promise<Product[]> => apiClient('/products', ProductsArraySchema),
  getById: (id: string): Promise<ProductDetail> =>
    apiClient(`/products/${id}`, ProductDetailSchema),
  search: (query: string): Promise<Product[]> =>
    apiClient(`/products?search=${query}`, ProductsArraySchema),
};
