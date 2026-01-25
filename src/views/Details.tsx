import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import type { ProductDetail } from '../types';

import { productService } from '../services/productService';
import { ProductInfo } from '../components/productInfo/ProductInfo';
import { Specifications } from '../components/specifications';
import { SimilarItems } from '../components/similarItems';
import { BackButton } from '../components/backButton';

const Container = styled.main`
  /* Desktop / Detail / Empty */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 48px;

  position: absolute;
  width: 1920px;
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 148px;

  background: #ffffff;
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
  left: calc(50% - 1200px / 2);
  top: 234px;
`;

const ImageContainer = styled.div`
  /* Image side */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  box-sizing: border-box;
`;

const OptionImg = styled.img`
  /* Img */

  max-width: 100%;
  max-height: 100%;
  object-fit: contain;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
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
              src={productDetail?.colorOptions?.[selectedColor]?.imageUrl ?? null}
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
