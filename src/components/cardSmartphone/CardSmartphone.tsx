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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleProductClick(product.id);
  };

  return (
    <article className="card-phone">
      <a
        href={`/product/${product.id}`}
        onClick={handleClick}
        aria-label={`View details for ${product.brand} ${product.name}`}
      >
        <ImageSmartphone product={product} />
        <InfoSmartphone product={product} />
      </a>
    </article>
  );
};
