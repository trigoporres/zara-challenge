import styled from 'styled-components';
import type { Product } from '../../schemas/product.schemas';

const CardImageWrapper = styled.div`
  /* Image wrapper */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 100%;
  height: 257px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  z-index: 1;
`;

const CardImage = styled.img`
  /* Image */

  width: 180px;
  height: 200px;
  object-fit: contain;

  /* Inside auto layout */
  flex: none;
  order: 0;
`;

export const ImageSmartphone = ({ product }: { product: Product }) => {
  return (
    <CardImageWrapper>
      <CardImage src={product.imageUrl} />
    </CardImageWrapper>
  );
};
