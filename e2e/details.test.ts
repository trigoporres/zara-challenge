import { test, expect } from '@playwright/test';

import {
  mockProductsApi,
  mockProductDetailApi,
  mockProductDetail,
} from './mocks/products.mock';

test.describe('Product Details', () => {
  test.beforeEach(async ({ page }) => {
    await mockProductsApi(page);
    await mockProductDetailApi(page);
  });

  test('should navigate to product details on click', async ({ page }) => {
    await page.goto('/');

    const firstProduct = page.locator('article').first();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/product\/.+/);
  });

  test('should display product name and price', async ({ page }) => {
    await page.goto('/product/1');

    await expect(
      page.getByRole('heading', { name: mockProductDetail.name }),
    ).toBeVisible();
    await expect(
      page.getByText(`${mockProductDetail.basePrice} EUR`),
    ).toBeVisible();
  });

  test('should display specifications section', async ({ page }) => {
    await page.goto('/product/1');

    await expect(page.getByTestId('specifications')).toBeVisible();
    await expect(page.getByText(mockProductDetail.brand)).toBeVisible();
    await expect(page.getByText(mockProductDetail.description)).toBeVisible();
  });

  test('should display similar items section', async ({ page }) => {
    await page.goto('/product/1');

    await expect(page.getByText('SIMILAR ITEMS')).toBeVisible();

    const similarProduct = mockProductDetail.similarProducts[0];
    await expect(page.getByText(similarProduct.name)).toBeVisible();
  });

  test('should display storage options', async ({ page }) => {
    await page.goto('/product/1');

    await expect(
      page.getByText('Storage ¿How much space do you need?'),
    ).toBeVisible();

    for (const storage of mockProductDetail.storageOptions) {
      await expect(page.getByText(storage.capacity)).toBeVisible();
    }
  });

  test('should display color options', async ({ page }) => {
    await page.goto('/product/1');

    await expect(page.getByText('Color. Pick your favourite.')).toBeVisible();
  });

  test('should have add to cart button disabled initially', async ({
    page,
  }) => {
    await page.goto('/product/1');

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeDisabled();
  });

  test('should enable add to cart button after selecting storage', async ({
    page,
  }) => {
    await page.goto('/product/1');

    const storageOption = page.getByText(
      mockProductDetail.storageOptions[0].capacity,
    );
    await storageOption.click();

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartButton).toBeEnabled();
  });

  test('should add product to cart and update cart count', async ({ page }) => {
    await page.goto('/product/1');

    const storageOption = page.getByText(
      mockProductDetail.storageOptions[0].capacity,
    );
    await storageOption.click();

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const cartLink = page.getByRole('link', {
      name: /shopping cart with 1 items/i,
    });
    await expect(cartLink).toBeVisible();
  });
});
