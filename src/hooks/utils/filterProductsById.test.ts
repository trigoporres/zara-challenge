import { describe, expect } from 'vitest';
import { filterProductsById } from './filterProductsById';
import type { Product } from '../../schemas/product.schemas';

describe('filterProductsById', () => {
  const cases: [string, Product[], Product[]][] = [
    [
      'without duplicates should return same array',
      [
        {
          basePrice: 100,
          brand: 'BrandA',
          id: '1',
          imageUrl: 'url1',
          name: 'Product1',
        },
        {
          basePrice: 200,
          brand: 'BrandB',
          id: '2',
          imageUrl: 'url2',
          name: 'Product2',
        },
      ],
      [
        {
          basePrice: 100,
          brand: 'BrandA',
          id: '1',
          imageUrl: 'url1',
          name: 'Product1',
        },
        {
          basePrice: 200,
          brand: 'BrandB',
          id: '2',
          imageUrl: 'url2',
          name: 'Product2',
        },
      ],
    ],
    [
      'whit duplicates should return filtered array',
      [
        {
          basePrice: 100,
          brand: 'BrandA',
          id: '1',
          imageUrl: 'url1',
          name: 'Product1',
        },
        {
          basePrice: 200,
          brand: 'BrandA',
          id: '1',
          imageUrl: 'url1',
          name: 'Product1',
        },
      ],
      [
        {
          basePrice: 100,
          brand: 'BrandA',
          id: '1',
          imageUrl: 'url1',
          name: 'Product1',
        },
      ],
    ],
  ];
  test.each(cases)('%s', (_title, products, expected) => {
    expect(filterProductsById(products)).toStrictEqual(expected);
  });
});
