import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../schemas/product.schemas';
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

  @media (max-width: 600px) {
    padding: 0 20px;
    margin: 0 0 24px 0;
    font-size: 20px;
  }
`;

const ScrollContainer = styled.div`
  width: 85%;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  margin: 0 auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
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

  @media (max-width: 600px) {
    width: 200px;
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
