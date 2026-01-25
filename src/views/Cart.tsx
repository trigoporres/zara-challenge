import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useCart } from '../hooks/useCart';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  padding: 60px 80px;
  background: #ffffff;
`;

const CartTitle = styled.h1`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #000000;
  margin: 0 0 40px 0;
`;

const CartContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 160px;
  object-fit: contain;
  background: #f5f5f5;
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h2`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #000000;
  margin: 0;
`;

const ProductSpecs = styled.p`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #666666;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  color: #000000;
  margin: 0;
  margin-top: auto;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  text-transform: uppercase;
  color: #ff0000;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

const ContinueShoppingButton = styled.button`
  background: #ffffff;
  border: 1px solid #000000;
  padding: 16px 24px;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const CheckoutSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const TotalLabel = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const TotalText = styled.span`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #000000;
`;

const TotalAmount = styled.span`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  color: #000000;
`;

const PayButton = styled.button`
  background: #000000;
  border: none;
  padding: 16px 48px;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #333333;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #666666;
`;

export const Cart = () => {
  const { cart, removeFromCart } = useCart();
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
      <CartContainer>
        <CartTitle>CART (0)</CartTitle>
        <EmptyCart>Your cart is empty</EmptyCart>
        <CartFooter>
          <ContinueShoppingButton onClick={() => navigate('/')}>
            CONTINUE SHOPPING
          </ContinueShoppingButton>
        </CartFooter>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>CART ({cart.length})</CartTitle>
      <CartContent>
        {cart.map((product) => (
          <CartItem key={product.id}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductDetails>
              <ProductName>{product.name}</ProductName>
              <ProductSpecs>
                {product.storage} | {product.color}
              </ProductSpecs>
              <ProductPrice>{formatPrice(product.price)} EUR</ProductPrice>
              <RemoveButton onClick={() => removeFromCart(product.id)}>
                Eliminar
              </RemoveButton>
            </ProductDetails>
          </CartItem>
        ))}
      </CartContent>
      <CartFooter>
        <ContinueShoppingButton onClick={() => navigate('/')}>
          CONTINUE SHOPPING
        </ContinueShoppingButton>
        <CheckoutSection>
          <TotalLabel>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{formatPrice(total)} EUR</TotalAmount>
          </TotalLabel>
          <PayButton onClick={() => alert('Payment functionality not implemented')}>
            PAY
          </PayButton>
        </CheckoutSection>
      </CartFooter>
    </CartContainer>
  );
};
