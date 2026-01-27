import { z } from 'zod';
import { safeUrl } from './helpers';

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  brand: z.string().min(1).max(100),
  basePrice: z.number().positive(),
  imageUrl: safeUrl(),
});

const ColorOptionSchema = z.object({
  name: z.string().min(1),
  hexCode: z.string().regex(/^#([A-Fa-f0-9]{3}){1,2}$/, 'Invalid hex color'),
  imageUrl: safeUrl(),
});

const StorageOptionSchema = z.object({
  capacity: z.string().min(1),
  price: z.number().positive(),
});

const SpecsSchema = z.object({
  screen: z.string(),
  resolution: z.string(),
  processor: z.string(),
  mainCamera: z.string(),
  selfieCamera: z.string(),
  battery: z.string(),
  os: z.string(),
  screenRefreshRate: z.string().optional(),
});

// Schema para ProductDetail (detalles de producto)
export const ProductDetailSchema = z.object({
  id: z.string().min(1),
  brand: z.string().min(1).max(100),
  name: z.string().min(1).max(200),
  description: z.string(),
  basePrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  colorOptions: z.array(ColorOptionSchema).min(1),
  storageOptions: z.array(StorageOptionSchema).min(1),
  specs: SpecsSchema,
  similarProducts: z.array(ProductSchema),
});

export const ProductsArraySchema = z.array(ProductSchema);

export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  imageUrl: safeUrl(),
  storage: z.string().min(1),
  color: z.string().min(1),
});

export const CartSchema = z.array(CartItemSchema);

export type Product = z.infer<typeof ProductSchema>;
export type ProductDetail = z.infer<typeof ProductDetailSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
