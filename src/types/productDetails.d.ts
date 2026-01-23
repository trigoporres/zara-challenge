import type { Product } from './product';

export interface ProductDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions: {
    name: string;
    hexCode: string;
    imageUrl: string;
  }[];
  storageOptions: {
    capacity: string;
    price: number;
  }[];
  similarProducts: Product[];
}
