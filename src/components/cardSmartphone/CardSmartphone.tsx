import type { Product } from '../../schemas/product.schemas';

import './CardPhone.css';

import { ImageSmartphone } from './ImageSmartphone';
import { InfoSmartphone } from './InfoSmartphone';

export const CardSmartphone = ({
  product,
  handleProductClick,
}: {
  product: Product;
  handleProductClick: (id: string) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick(product.id);
    }
  };

  return (
    <article
      className="card-phone"
      onClick={() => handleProductClick(product.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.brand} ${product.name}`}
    >
      <ImageSmartphone product={product} />
      <InfoSmartphone product={product} />
    </article>
  );
};
