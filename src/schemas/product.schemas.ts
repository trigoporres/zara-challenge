import { z } from 'zod';

// Helper: Valida que sea URL segura (solo https:// o http://)
const safeUrl = () =>
  z.url().refine(
    (url) => url.startsWith('https://') || url.startsWith('http://'),
    'URL must use https:// or http:// protocol'
  );

// Schema para Product (lista de productos)
export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  brand: z.string().min(1).max(100),
  basePrice: z.number().positive(),
  imageUrl: safeUrl(), // ✅ Solo permite https:// o http://
});

// Schema para ColorOption
const ColorOptionSchema = z.object({
  name: z.string().min(1),
  hexCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'), // Valida formato hex
  imageUrl: safeUrl(), // ✅ Solo permite https:// o http://
});

// Schema para StorageOption
const StorageOptionSchema = z.object({
  capacity: z.string().min(1),
  price: z.number().positive(),
});

// Schema para Specs
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
  rating: z.number().min(0).max(5), // Rating debe estar entre 0 y 5
  specs: SpecsSchema,
  colorOptions: z.array(ColorOptionSchema).min(1), // Al menos 1 color
  storageOptions: z.array(StorageOptionSchema).min(1), // Al menos 1 storage
  similarProducts: z.array(ProductSchema),
});

// Schema para array de productos
export const ProductsArraySchema = z.array(ProductSchema);

// Schema para CartItem (items del carrito de compras)
export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  price: z.number().positive(), // Debe ser número positivo
  quantity: z.number().int().positive(), // Debe ser entero positivo (>=1)
  imageUrl: safeUrl(), // ✅ Solo permite https:// o http://
  storage: z.string().min(1), // No puede ser vacío
  color: z.string().min(1), // No puede ser vacío
});

// Schema para array de items del carrito
export const CartSchema = z.array(CartItemSchema);

// Exportar tipos inferidos de los schemas (mantiene DRY - Don't Repeat Yourself)
export type Product = z.infer<typeof ProductSchema>;
export type ProductDetail = z.infer<typeof ProductDetailSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
