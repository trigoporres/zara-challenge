import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { CardSmartphone } from '../cardSmartphone/CardSmartphone';

const SimilarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 48px 0;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  margin: 0 0 48px 0;
  padding: 0 100px;
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 100px;
  box-sizing: border-box;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
  width: fit-content;
`;

const CardWrapper = styled.div`
  flex: 0 0 auto;
  width: 300px;

  /* Override CardSmartphone width for horizontal scroll */
  > div {
    width: 100%;
  }
`;

interface SimilarItemsProps {
  similarProducts: Product[];
}

export const SimilarItems = ({ similarProducts }: SimilarItemsProps) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  return (
    <SimilarContainer>
      <Title>SIMILAR ITEMS</Title>
      <ScrollContainer>
        <ItemsWrapper>
          {similarProducts.map((product) => (
            <CardWrapper key={product.id}>
              <CardSmartphone
                product={product}
                handleProductClick={handleProductClick}
              />
            </CardWrapper>
          ))}
        </ItemsWrapper>
      </ScrollContainer>
    </SimilarContainer>
  );
};
