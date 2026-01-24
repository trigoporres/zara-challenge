import { useContext } from 'react';
import { CartStateContext, CartDispatchContext } from '../contexts/CartContext';

export const useCart = () => {
  const cart = useContext(CartStateContext);
  const actions = useContext(CartDispatchContext);

  if (actions === null) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return {
    cart,
    ...actions,
  };
};
