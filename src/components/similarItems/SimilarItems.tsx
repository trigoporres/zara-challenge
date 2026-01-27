import { useNavigate } from 'react-router-dom';
import type { Product } from '../../schemas/product.schemas';
import { CardSmartphone } from '../cardSmartphone/CardSmartphone';
import './SimilarItems.css';

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
    <div className="similar-container" aria-labelledby="similar-title">
      <h2 id="similar-title" className="similar-title">
        SIMILAR ITEMS
      </h2>
      <div className="scroll-container" tabIndex={0}>
        <div className="items-wrapper">
          {similarProducts.map((product) => (
            <div className="card-wrapper" key={product.id}>
              <CardSmartphone
                product={product}
                handleProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
