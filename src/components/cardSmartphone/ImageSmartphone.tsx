import type { Product } from '../../schemas/product.schemas';

import './ImageSmartphone.css';

export const ImageSmartphone = ({ product }: { product: Product }) => {
  return (
    <div className="card-image-wrapper">
      <img
        className="card-image"
        src={product.imageUrl}
        alt={`${product.brand} ${product.name}`}
      />
    </div>
  );
};
