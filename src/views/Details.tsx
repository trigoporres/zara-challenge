import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { ProductDetail } from '../schemas';

import { productService } from '../services';
import {
  ProductInfo,
  Specifications,
  SimilarItems,
  BackButton,
} from '../components';
import './Details.css';

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

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <BackButton />
      <main className="details-container">
        <div className="details-product">
          <div className="details-image">
            <img
              className="details-image__img"
              src={
                productDetail?.colorOptions?.[selectedColor]?.imageUrl ?? null
              }
              alt=""
            />
          </div>
          <ProductInfo
            productDetail={productDetail}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <Specifications productDetail={productDetail} />
        <SimilarItems similarProducts={productDetail?.similarProducts ?? []} />
      </main>
    </>
  );
};
