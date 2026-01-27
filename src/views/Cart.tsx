import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks';
import './Cart.css';

export const Cart = () => {
  const { cart, removeFromCart, removeFromUnitCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">Your cart is empty</div>
        <div className="cart-footer">
          <button
            className="cart-footer__continue-btn"
            onClick={() => navigate('/')}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <img
              className="cart-item__image"
              src={product.imageUrl}
              alt={product.name}
            />
            <div className="cart-item__details">
              <h2 className="cart-item__name">{product.name}</h2>
              <p className="cart-item__specs">
                {product.storage} | {product.color} | Qty: {product.quantity}
              </p>
              <p className="cart-item__price">
                {formatPrice(product.price)} EUR
              </p>
              <button
                className="cart-item__remove-btn"
                onClick={() =>
                  product.quantity > 1
                    ? removeFromUnitCart(product.id)
                    : removeFromCart(product.id)
                }
              >
                {product.quantity > 1 ? `Remove One` : `Remove from Cart`}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <button
          className="cart-footer__continue-btn"
          onClick={() => navigate('/')}
        >
          CONTINUE SHOPPING
        </button>
        <div className="cart-checkout">
          <div className="cart-checkout__total">
            <span className="cart-checkout__total-text">TOTAL</span>
            <span className="cart-checkout__total-amount">
              {formatPrice(total)} EUR
            </span>
          </div>
          <button
            className="cart-checkout__pay-btn"
            onClick={() => alert('Payment functionality not implemented')}
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  );
};
