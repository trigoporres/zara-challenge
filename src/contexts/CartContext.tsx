import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CartSchema, type CartItem } from '../schemas/product.schemas';

export interface CartActions {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  removeFromUnitCart: (id: string) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
}

// Contextos
export const CartStateContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<CartActions | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Inicialización desde localStorage solo en mount con validación Zod
    try {
      const stored = localStorage.getItem('shopping-cart');
      if (!stored) return [];

      const parsed = JSON.parse(stored);

      // ✅ VALIDACIÓN CON ZOD - Protege contra datos corruptos o maliciosos
      const validated = CartSchema.safeParse(parsed);

      if (!validated.success) {
        // Log detallado del error en desarrollo
        if (import.meta.env.DEV) {
          console.error('❌ Invalid cart data in localStorage:', {
            error: validated.error.toString(),
            receivedData: parsed,
          });
        }
        // Limpia localStorage corrupto
        localStorage.removeItem('shopping-cart');
        return [];
      }

      return validated.data; // ✅ Datos validados y seguros
    } catch (error) {
      // Error al parsear JSON (localStorage corrupto)
      if (import.meta.env.DEV) {
        console.error('Error parsing cart from localStorage:', error);
      }
      localStorage.removeItem('shopping-cart');
      return [];
    }
  });

  // Actions memoizadas - solo se crean una vez
  const actions = useMemo<CartActions>(
    () => ({
      addToCart: (item: CartItem) => {
        setCart((prev) => {
          const newCart = [...prev, item];
          localStorage.setItem('shopping-cart', JSON.stringify(newCart));
          return newCart;
        });
      },

      removeFromCart: (id: string) => {
        setCart((prev) => {
          const newCart = prev.filter((item) => item.id !== id);
          localStorage.setItem('shopping-cart', JSON.stringify(newCart));
          return newCart;
        });
      },

      removeFromUnitCart: (id: string) => {
        setCart((prev) => {
          const newCart = prev.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
          localStorage.setItem('shopping-cart', JSON.stringify(newCart));
          return newCart;
        });
      },

      updateCartItem: (id: string, updates: Partial<CartItem>) => {
        setCart((prev) => {
          const newCart = prev.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
          );
          localStorage.setItem('shopping-cart', JSON.stringify(newCart));
          return newCart;
        });
      },

      clearCart: () => {
        setCart([]);
        localStorage.removeItem('shopping-cart');
      },
    }),
    [],
  ); // Sin dependencias - funciones estables

  return (
    <CartDispatchContext.Provider value={actions}>
      <CartStateContext.Provider value={cart}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}
