import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useProducts } from './useProducts';
import { productService } from '../services/productService';
import type { Product } from '../schemas/product.schemas';

vi.mock('../services/productService', () => ({
  productService: {
    getAll: vi.fn(),
    search: vi.fn(),
  },
}));

const createMockProduct = (id: string, name: string): Product => ({
  id,
  name,
  brand: 'Test Brand',
  basePrice: 999,
  imageUrl: `https://example.com/${id}.jpg`,
});

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should start with loading true and empty products', () => {
      vi.mocked(productService.getAll).mockImplementation(
        () => new Promise(() => {}),
      );

      const { result } = renderHook(() => useProducts());

      expect(result.current.loading).toBe(true);
      expect(result.current.products).toEqual([]);
      expect(result.current.error).toBeNull();
    });
  });

  describe('fetching without search query', () => {
    it('should fetch all products and set loading to false', async () => {
      const mockProducts = [
        createMockProduct('1', 'iPhone 15'),
        createMockProduct('2', 'Samsung Galaxy'),
      ];
      vi.mocked(productService.getAll).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(productService.getAll).toHaveBeenCalledTimes(1);
      expect(productService.search).not.toHaveBeenCalled();
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.error).toBeNull();
    });

    it('should filter duplicate products by id', async () => {
      const mockProducts = [
        createMockProduct('1', 'iPhone 15'),
        createMockProduct('1', 'iPhone 15 Duplicate'), // Duplicate ID
        createMockProduct('2', 'Samsung Galaxy'),
      ];
      vi.mocked(productService.getAll).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.products).toHaveLength(2);
      expect(result.current.products[0].name).toBe('iPhone 15');
      expect(result.current.products[1].name).toBe('Samsung Galaxy');
    });

    it('should limit products to 20 items', async () => {
      const mockProducts = Array.from({ length: 30 }, (_, i) =>
        createMockProduct(`${i}`, `Product ${i}`),
      );
      vi.mocked(productService.getAll).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.products).toHaveLength(20);
    });
  });

  describe('fetching with search query', () => {
    it('should use search endpoint when searchQuery is provided', async () => {
      const mockProducts = [createMockProduct('1', 'iPhone 15')];
      vi.mocked(productService.search).mockResolvedValue(mockProducts);

      const { result } = renderHook(() =>
        useProducts({ searchQuery: 'iphone' }),
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(productService.search).toHaveBeenCalledWith('iphone');
      expect(productService.getAll).not.toHaveBeenCalled();
      expect(result.current.products).toEqual(mockProducts);
    });

    it('should refetch when searchQuery changes', async () => {
      const allProducts = [createMockProduct('1', 'iPhone 15')];
      const searchResults = [createMockProduct('2', 'Samsung Galaxy')];

      vi.mocked(productService.getAll).mockResolvedValue(allProducts);
      vi.mocked(productService.search).mockResolvedValue(searchResults);

      const { result, rerender } = renderHook(
        ({ searchQuery }) => useProducts({ searchQuery }),
        { initialProps: { searchQuery: undefined as string | undefined } },
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.products).toEqual(allProducts);

      // Change search query
      rerender({ searchQuery: 'samsung' });

      await waitFor(() => {
        expect(result.current.products).toEqual(searchResults);
      });

      expect(productService.search).toHaveBeenCalledWith('samsung');
    });
  });

  describe('error handling', () => {
    it('should set error when fetch fails with Error instance', async () => {
      const mockError = new Error('Network error');
      vi.mocked(productService.getAll).mockRejectedValue(mockError);

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(mockError);
      expect(result.current.products).toEqual([]);
    });

    it('should wrap non-Error exceptions in Error object', async () => {
      vi.mocked(productService.getAll).mockRejectedValue('String error');

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Failed to fetch products');
    });

    it('should reset error on successful refetch', async () => {
      const mockError = new Error('Network error');
      vi.mocked(productService.getAll).mockRejectedValueOnce(mockError);

      const { result, rerender } = renderHook(
        ({ searchQuery }) => useProducts({ searchQuery }),
        { initialProps: { searchQuery: undefined as string | undefined } },
      );

      await waitFor(() => {
        expect(result.current.error).toBe(mockError);
      });

      // Now mock successful response
      const mockProducts = [createMockProduct('1', 'iPhone 15')];
      vi.mocked(productService.search).mockResolvedValue(mockProducts);

      rerender({ searchQuery: 'iphone' });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });

      expect(result.current.products).toEqual(mockProducts);
    });
  });
});
