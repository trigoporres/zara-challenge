import { test, expect } from '@playwright/test';

import { mockProductsApi, mockProducts } from './mocks/products.mock';

test.describe('Home Page', () => {
  test('should display home view', async ({ page }) => {
    await mockProductsApi(page);

    await page.goto('/');

    await expect(page.locator('input[type="search"]')).toBeVisible();

    const productList = page.getByTestId('product-list');
    await expect(productList).toBeVisible();
    await expect(productList.locator('article')).toHaveCount(
      mockProducts.length,
    );
  });

  test('should search products', async ({ page }) => {
    await mockProductsApi(page);

    await page.goto('/');

    await expect(page.locator('input[type="search"]')).toBeVisible();

    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill('iphone');

    await page.waitForTimeout(600);

    await expect(page).toHaveURL(/search=iphone/);
  });
});
