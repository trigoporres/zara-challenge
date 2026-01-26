import { useState } from 'react';
import { styled } from 'styled-components';

import type { ProductDetail } from '../../schemas/product.schemas';

import { useCart } from '../../hooks/useCart';

import { TitlePrice } from './TitlePrice';
import { Storage } from './Storage';
import { Color } from './Color';

const Options = styled.div`
  /* Options side */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  background: #ffffff;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const OptionInfo = styled.div`
  /* Product info */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 64px;

  margin: 0 auto;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    gap: 32px;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: 380px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SectionLabel = styled.p`
  width: auto;
  height: auto;

  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: uppercase;

  color: #000000;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
`;

const AddToCartButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;

  width: 380px;
  height: 48px;

  background: ${(props) => (props.disabled ? '#F5F5F5' : '#000000')};
  border: none;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;

  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;

  color: ${(props) => (props.disabled ? '#CCCCCC' : '#FFFFFF')};

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${(props) => (props.disabled ? '#F5F5F5' : '#333333')};
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ProductInfo = ({
  productDetail,
  selectedColor,
  setSelectedColor,
}: {
  productDetail: ProductDetail;
  selectedColor: number;
  setSelectedColor: (index: number) => void;
}) => {
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const { addToCart, cart, updateCartItem } = useCart();
  const handleAddToCart = () => {
    if (productDetail && selectedStorage) {
      const existingCartItem = cart.find((c) => c.id === productDetail.id);
      if (existingCartItem) {
        updateCartItem(existingCartItem.id, {
          quantity: existingCartItem.quantity + 1,
        });
      } else {
        addToCart({
          id: productDetail.id,
          name: productDetail.name,
          price: productDetail.basePrice,
          quantity: 1,
          imageUrl: productDetail.colorOptions?.[selectedColor]?.imageUrl || '',
          storage: selectedStorage,
          color: productDetail.colorOptions?.[selectedColor]?.name || '',
        });
      }
    }
  };
  return (
    <Options>
      <OptionInfo>
        <TitlePrice
          name={productDetail?.name}
          basePrice={productDetail?.basePrice}
        />
        {/* Storage Options */}
        <SectionContainer>
          <SectionLabel>Storage ¿How much space do you need?</SectionLabel>
          <Storage
            storageOptions={productDetail?.storageOptions}
            selectedStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
          />
        </SectionContainer>
        {/* Color Options */}
        <SectionContainer>
          <SectionLabel>Color. Pick your favourite.</SectionLabel>
          <Color
            colorOptions={productDetail?.colorOptions}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </SectionContainer>

        {/* Add to Cart Button */}
        <AddToCartButton onClick={handleAddToCart} disabled={!selectedStorage}>
          Add to cart
        </AddToCartButton>
      </OptionInfo>
    </Options>
  );
};
