import { apiClient } from '../api/apiClient';
import {
  ProductsArraySchema,
  ProductDetailSchema,
  type Product,
  type ProductDetail,
} from '../schemas/product.schemas';

export const productService = {
  /**
   * Get all products from the API
   * @returns Array of validated products
   */
  getAll: (): Promise<Product[]> => apiClient('/products', ProductsArraySchema),

  /**
   * Get a single product by ID with full details
   * @param id - Product ID
   * @returns Validated product detail
   */
  getById: (id: string): Promise<ProductDetail> =>
    apiClient(`/products/${id}`, ProductDetailSchema),

  /**
   * Search products by query string
   * @param query - Search query
   * @returns Array of validated products matching the search
   */
  search: (query: string): Promise<Product[]> =>
    apiClient(`/products?search=${query}`, ProductsArraySchema),
};
