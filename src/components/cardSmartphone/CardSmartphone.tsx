import styled from 'styled-components';
import type { Product } from '../../schemas/product.schemas';
import { ImageSmartphone } from './ImageSmartphone';
import { InfoSmartphone, Brand, Name, BasePrice } from './InfoSmartphone';

const CardPhone = styled.article`
  /* Smartphone card */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  isolation: isolate;

  width: calc(100% / 5);
  height: 344px;

  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #000000;
    transition: height 0.6s ease-in-out;
    z-index: -1;
  }

  &:hover {
    cursor: pointer;

    &::before {
      height: 100%;
    }

    ${Brand} {
      color: #ffffff;
    }

    ${Name} {
      color: #ffffff;
    }

    ${BasePrice} {
      color: #ffffff;
    }
  }

  border: 0.5px solid #000000;
  box-sizing: border-box;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  /* Responsive breakpoints */
  @media (max-width: 1400px) {
    width: calc(100% / 4);
  }

  @media (max-width: 1100px) {
    width: calc(100% / 3);
  }

  @media (max-width: 800px) {
    width: calc(100% / 2);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const CardSmartphone = ({
  product,
  handleProductClick,
}: {
  product: Product;
  handleProductClick: (id: string) => void;
}) => {
  return (
    <CardPhone key={product.id} onClick={() => handleProductClick(product.id)}>
      <ImageSmartphone product={product} />
      <InfoSmartphone product={product} />
    </CardPhone>
  );
};
