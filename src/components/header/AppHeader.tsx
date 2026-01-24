import { useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { HeaderCmp } from './Header';
import './AppHeader.css';

export const AppHeader = () => {
  const location = useLocation();

  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <HeaderCmp
        cartItemCount={itemCount}
        hideBag={location.pathname === '/cart'}
      />
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {itemCount > 0 && `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in cart`}
      </div>
    </>
  );
};
