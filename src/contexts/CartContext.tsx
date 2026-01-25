import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  storage: string;
  color: string;
}

export interface CartActions {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// Contextos
export const CartStateContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<CartActions | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Inicialización desde localStorage solo en mount
    const stored = localStorage.getItem('shopping-cart');
    return stored ? JSON.parse(stored) : [];
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
