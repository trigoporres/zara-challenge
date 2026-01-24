import { Link } from 'react-router-dom';
import { BagIcon } from './BagIcon';
import './Bag.css';

interface BagProps {
  itemCount?: number;
}

export const BagCmp = ({ itemCount = 0 }: BagProps) => {
  return (
    <div className="bag">
      <Link
        to="/cart"
        aria-label={`Shopping cart with ${itemCount} items`}
        className="bag-link"
      >
        <BagIcon itemCount={itemCount} />
      </Link>
    </div>
  );
};
