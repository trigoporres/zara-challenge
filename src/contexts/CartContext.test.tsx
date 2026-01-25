import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, CartStateContext, CartDispatchContext } from './CartContext';
import { useContext } from 'react';

describe('CartContext with Zod validation', () => {
  beforeEach(() => {
    // Limpia localStorage antes de cada test
    localStorage.clear();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const useCart = () => {
    const cart = useContext(CartStateContext);
    const actions = useContext(CartDispatchContext);
    return { cart, actions };
  };

  it('should initialize with empty cart when localStorage is empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
  });

  it('should load valid cart data from localStorage', () => {
    const validCart = [
      {
        id: '123',
        name: 'iPhone 15',
        price: 999,
        quantity: 1,
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(validCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual(validCart);
  });

  it('should reject cart with price as string (XSS protection)', () => {
    const invalidCart = [
      {
        id: '123',
        name: 'iPhone',
        price: 'GRATIS', // ❌ String en lugar de number
        quantity: 1,
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(invalidCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    // Debe inicializar con carrito vacío y limpiar localStorage
    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('should reject cart with negative quantity', () => {
    const invalidCart = [
      {
        id: '123',
        name: 'iPhone',
        price: 999,
        quantity: -1, // ❌ Cantidad negativa
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(invalidCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('should reject cart with malicious URL', () => {
    const invalidCart = [
      {
        id: '123',
        name: 'iPhone',
        price: 999,
        quantity: 1,
        imageUrl: 'javascript:alert("XSS")', // ❌ URL maliciosa
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(invalidCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('should reject cart with empty required fields', () => {
    const invalidCart = [
      {
        id: '', // ❌ ID vacío
        name: 'iPhone',
        price: 999,
        quantity: 1,
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: '', // ❌ Color vacío
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(invalidCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('should reject cart with decimal quantity', () => {
    const invalidCart = [
      {
        id: '123',
        name: 'iPhone',
        price: 999,
        quantity: 1.5, // ❌ Decimal en lugar de entero
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(invalidCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('should handle corrupted JSON in localStorage', () => {
    localStorage.setItem('shopping-cart', 'invalid-json{[');

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('should add item to cart and persist to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const newItem = {
      id: '123',
      name: 'iPhone 15',
      price: 999,
      quantity: 1,
      imageUrl: 'https://example.com/iphone.jpg',
      storage: '128GB',
      color: 'Black',
    };

    act(() => {
      result.current.actions?.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(newItem);

    // Verifica que se guardó en localStorage
    const stored = localStorage.getItem('shopping-cart');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual([newItem]);
  });

  it('should remove item from cart and update localStorage', () => {
    const initialCart = [
      {
        id: '123',
        name: 'iPhone 15',
        price: 999,
        quantity: 1,
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toHaveLength(1);

    act(() => {
      result.current.actions?.removeFromCart('123');
    });

    expect(result.current.cart).toHaveLength(0);

    // Verifica que se actualizó localStorage
    const stored = localStorage.getItem('shopping-cart');
    expect(JSON.parse(stored!)).toEqual([]);
  });

  it('should clear cart and remove from localStorage', () => {
    const initialCart = [
      {
        id: '123',
        name: 'iPhone 15',
        price: 999,
        quantity: 1,
        imageUrl: 'https://example.com/iphone.jpg',
        storage: '128GB',
        color: 'Black',
      },
    ];

    localStorage.setItem('shopping-cart', JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toHaveLength(1);

    act(() => {
      result.current.actions?.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });
});
