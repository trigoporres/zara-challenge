import styled from 'styled-components';
import type { Product } from '../../schemas/product.schemas';

const ProductInfo = styled.div`
  /* Info */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 8px;

  width: 100%;

  /* Inside auto layout */
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  z-index: 2;
`;

const BrandName = styled.div`
  /* Brand + name */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  margin: 0;

  height: 31px;

  /* Inside auto layout */
  flex: 1;
  order: 0;
  min-width: 0;
`;

export const Brand = styled.span`
  /* Brand */

  width: 250px;
  height: 12px;

  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  /* identical to box height */
  text-transform: uppercase;

  color: #79736d;
  transition: color 0.6s ease-in-out;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Name = styled.span`
  /* Name */

  width: 250px;
  height: 15px;

  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  text-transform: uppercase;

  color: #000000;
  transition: color 0.6s ease-in-out;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const BasePrice = styled.span`
  /* Price */

  margin: 0;
  height: 15px;

  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  text-align: right;
  text-transform: capitalize;
  white-space: nowrap;

  color: #000000;
  transition: color 0.6s ease-in-out;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-shrink: 0;
`;

export const InfoSmartphone = ({ product }: { product: Product }) => {
  return (
    <ProductInfo>
      <BrandName>
        <Brand>{product.brand}</Brand>
        <Name>{product.name}</Name>
      </BrandName>
      <BasePrice>{product.basePrice} EUR</BasePrice>
    </ProductInfo>
  );
};
