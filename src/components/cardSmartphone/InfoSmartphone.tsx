import type { Product } from '../../schemas/product.schemas';

import './InfoSmartphone.css';

export const InfoSmartphone = ({ product }: { product: Product }) => {
  return (
    <div className="product-info">
      <div className="brand-name">
        <span className="brand">{product.brand}</span>
        <span className="name">{product.name}</span>
      </div>
      <span className="base-price">{product.basePrice} EUR</span>
    </div>
  );
};
