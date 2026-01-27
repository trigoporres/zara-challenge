import { test, expect } from '@playwright/test';

import {
  mockProductsApi,
  mockProductDetailApi,
  mockProductDetail,
} from './mocks/products.mock';

test.describe('Cart View', () => {
  test.beforeEach(async ({ page }) => {
    await mockProductsApi(page);
    await mockProductDetailApi(page);
  });

  test('should add product to cart and navigate to cart view', async ({
    page,
  }) => {
    await page.goto('/product/1');

    // Select storage option
    const storageOption = page.getByText(
      mockProductDetail.storageOptions[0].capacity,
    );
    await storageOption.click();

    // Select color option (click on second color button to change from default)
    // First, verify default color is shown (Black)
    await expect(page.getByText(mockProductDetail.colorOptions[0].name)).toBeVisible();

    // Find color section and click second color button
    // The color buttons are 32x32 buttons within the color section
    const colorSection = page.getByText('Color. Pick your favourite.').locator('..');
    const colorButtons = colorSection.locator('button');
    await colorButtons.nth(1).click();

    // Verify color name changed to second color (Blue)
    await expect(page.getByText(mockProductDetail.colorOptions[1].name)).toBeVisible();

    // Add to cart
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // Click on bag/cart icon
    const cartLink = page.getByRole('link', {
      name: /shopping cart with 1 items/i,
    });
    await cartLink.click();

    // Verify we're on the cart page
    await expect(page).toHaveURL('/cart');

    // Verify cart title shows 1 item
    await expect(page.getByRole('heading', { name: /cart \(1\)/i })).toBeVisible();

    // Verify product details are correct
    await expect(page.getByRole('heading', { name: mockProductDetail.name })).toBeVisible();
    await expect(
      page.getByText(
        `${mockProductDetail.storageOptions[0].capacity} | ${mockProductDetail.colorOptions[1].name} | Qty: 1`,
      ),
    ).toBeVisible();

    // Verify price is displayed (use first() since price appears in product and total)
    await expect(
      page.getByText(`${mockProductDetail.basePrice} EUR`).first(),
    ).toBeVisible();

    // Verify total is displayed
    await expect(page.getByText('TOTAL')).toBeVisible();
  });

  test('should remove product from cart', async ({ page }) => {
    await page.goto('/product/1');

    // Select storage and add to cart
    const storageOption = page.getByText(
      mockProductDetail.storageOptions[0].capacity,
    );
    await storageOption.click();

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // Navigate to cart
    const cartLink = page.getByRole('link', {
      name: /shopping cart with 1 items/i,
    });
    await cartLink.click();

    // Verify product is in cart
    await expect(page.getByRole('heading', { name: mockProductDetail.name })).toBeVisible();

    // Click remove button
    const removeButton = page.getByRole('button', { name: /remove from cart/i });
    await removeButton.click();

    // Verify cart is now empty
    await expect(page.getByText('Your cart is empty')).toBeVisible();
    await expect(page.getByRole('heading', { name: /cart \(0\)/i })).toBeVisible();
  });

  test('should show correct product with selected storage and default color', async ({
    page,
  }) => {
    await page.goto('/product/1');

    // Select second storage option (256 GB)
    const storageOption = page.getByText(
      mockProductDetail.storageOptions[1].capacity,
    );
    await storageOption.click();

    // Add to cart (with default color - first one)
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // Navigate to cart
    const cartLink = page.getByRole('link', {
      name: /shopping cart with 1 items/i,
    });
    await cartLink.click();

    // Verify product specs show correct storage and default color
    await expect(
      page.getByText(
        `${mockProductDetail.storageOptions[1].capacity} | ${mockProductDetail.colorOptions[0].name} | Qty: 1`,
      ),
    ).toBeVisible();
  });

  test('should allow continue shopping from cart', async ({ page }) => {
    await page.goto('/product/1');

    // Add product to cart
    const storageOption = page.getByText(
      mockProductDetail.storageOptions[0].capacity,
    );
    await storageOption.click();

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // Navigate to cart
    const cartLink = page.getByRole('link', {
      name: /shopping cart with 1 items/i,
    });
    await cartLink.click();

    // Click continue shopping
    const continueShoppingButton = page.getByRole('button', {
      name: /continue shopping/i,
    });
    await continueShoppingButton.click();

    // Verify we're back on home page
    await expect(page).toHaveURL('/');
  });
});
