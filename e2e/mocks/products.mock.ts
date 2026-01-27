import { Page } from '@playwright/test';

export const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15',
    brand: 'Apple',
    basePrice: 999,
    imageUrl:
      'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/iphone15.jpg',
  },
  {
    id: '2',
    name: 'Galaxy S24',
    brand: 'Samsung',
    basePrice: 899,
    imageUrl:
      'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/galaxy.jpg',
  },
];

export const mockProductDetail = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'The latest iPhone with advanced features',
  basePrice: 999,
  rating: 4.5,
  specs: {
    screen: '6.1" Super Retina XDR',
    resolution: '2556 x 1179 pixels',
    processor: 'A16 Bionic',
    mainCamera: '48 MP',
    selfieCamera: '12 MP',
    battery: '3349 mAh',
    os: 'iOS 17',
    screenRefreshRate: '60 Hz',
  },
  colorOptions: [
    {
      name: 'Black',
      hexCode: '#000000',
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/iphone15-black.jpg',
    },
    {
      name: 'Blue',
      hexCode: '#0000FF',
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/iphone15-blue.jpg',
    },
  ],
  storageOptions: [
    { capacity: '128 GB', price: 999 },
    { capacity: '256 GB', price: 1099 },
  ],
  similarProducts: [
    {
      id: '2',
      name: 'Galaxy S24',
      brand: 'Samsung',
      basePrice: 899,
      imageUrl:
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/galaxy.jpg',
    },
  ],
};

export async function mockProductsApi(page: Page, products = mockProducts) {
  await page.route('**/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(products),
    });
  });
}

export async function mockProductDetailApi(
  page: Page,
  productDetail = mockProductDetail,
) {
  await page.route('**/products/*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(productDetail),
    });
  });
}
