import { useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { HeaderCmp } from './Header';

export const AppHeader = () => {
  const location = useLocation();

  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <HeaderCmp
      cartItemCount={itemCount}
      hideBag={location.pathname === '/cart'}
    />
  );
};
