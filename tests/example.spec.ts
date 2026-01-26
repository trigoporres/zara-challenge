import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display products grid', async ({ page }) => {
    await page.goto('/');

    // Wait for search input to be visible (page loaded)
    await expect(page.locator('input[type="search"]')).toBeVisible();

    // Wait for products to load (loading state finishes)
    await expect(page.locator('body')).toContainText(/results/i, {
      timeout: 10000,
    });
  });

  test('should search products', async ({ page }) => {
    await page.goto('/');

    // Wait for initial load
    await expect(page.locator('input[type="search"]')).toBeVisible();

    // Find search input and type
    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill('iphone');

    // Wait for debounce and results update
    await page.waitForTimeout(600);

    // URL should update with search param
    await expect(page).toHaveURL(/search=iphone/);
  });
});

test.describe('Product Details', () => {
  test('should navigate to product details on click', async ({ page }) => {
    await page.goto('/');

    // Wait for products to load
    await expect(page.locator('body')).toContainText(/results/i, {
      timeout: 10000,
    });

    // Click first product card (contains price with $)
    const firstProduct = page.locator('div').filter({ hasText: /\$\s*\d+/ }).first();
    await firstProduct.click();

    // Should be on product detail page
    await expect(page).toHaveURL(/\/product\/.+/);
  });
});
