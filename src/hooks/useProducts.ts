import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { filterProductsById } from './utils/filterProductsById';
import type { Product } from '../schemas/product.schemas';

// Custom hook to fetch products
// The API returns the product XMI-RN13P5G as duplicate, so we need to:
// 1. Fetch all products
// 2. Filter duplicates
// 3. Limit to 20 unique products as required by the exercise
export const useProducts = ({ searchQuery }: { searchQuery?: string } = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data = [];

        if (!!searchQuery) {
          data = await productService.search(searchQuery);
        } else {
          data = await productService.getAll();
        }

        // Simulate slow API for testing progress bar (remove this in production)
        // await new Promise((resolve) => setTimeout(resolve, 4000));

        setProducts(filterProductsById(data).slice(0, 20));
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch products'),
        );
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return { products, loading, error };
};
