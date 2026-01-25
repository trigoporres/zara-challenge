import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import type { ProductDetail } from '../schemas';

import { productService } from '../services';
import {
  ProductInfo,
  Specifications,
  SimilarItems,
  BackButton,
} from '../components';

const Container = styled.main`
  /* Desktop / Detail / Empty */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 48px;

  position: absolute;
  width: 100%;
  max-width: 1920px;
  left: 50%;
  transform: translateX(-50%);
  top: 148px;

  background: #ffffff;

  @media (max-width: 600px) {
    top: 120px;
    gap: 32px;
  }
`;

const ProductContainer = styled.div`
  /* Product info + Img */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  width: 80%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 32px;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const ImageContainer = styled.div`
  /* Image side */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  box-sizing: border-box;

  width: 50%;
  min-width: 300px;

  @media (max-width: 900px) {
    width: 100%;
    min-width: unset;
  }
`;

const OptionImg = styled.img`
  /* Img */

  max-width: 100%;
  max-height: 600px;
  object-fit: contain;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  @media (max-width: 600px) {
    max-height: 400px;
  }
`;

export const Details = () => {
  const [productDetail, setProductDetail] = useState<ProductDetail>(
    {} as ProductDetail,
  );
  const [selectedColor, setSelectedColor] = useState<number>(0);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return;

      try {
        const product = await productService.getById(id);
        setProductDetail(product);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <>
      <BackButton />
      <Container>
        <ProductContainer>
          {/* Left side: Image */}
          <ImageContainer>
            <OptionImg
              src={
                productDetail?.colorOptions?.[selectedColor]?.imageUrl ?? null
              }
              alt=""
            />
          </ImageContainer>
          <ProductInfo
            productDetail={productDetail}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </ProductContainer>
        <Specifications productDetail={productDetail} />
        <SimilarItems similarProducts={productDetail?.similarProducts ?? []} />
      </Container>
    </>
  );
};
