import type { Product } from '../../types';

export const filterProductsById = (products: Product[]) => {
  const uniqueProductsMap = new Map<string, Product>()
  products.forEach(product => {
    if (!uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product)
    }
  })
  return Array.from(uniqueProductsMap.values())
}
