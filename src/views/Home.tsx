import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useProducts, useDebounce, useProgressBar } from '../hooks';
import {
  ProgressBarCmp,
  CardSmartphone,
  SearchBar,
  ResultsCounter,
} from '../components';
import './Home.css';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { products, loading, error } = useProducts({
    searchQuery: debouncedSearch,
  });
  const progress = useProgressBar({ isLoading: loading });
  const navigate = useNavigate();

  // Sync searchTerm with URL query params
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchTerm(query);
    if (query === '') {
      navigate('/');
    } else {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <main className="home-container">
      {loading && <ProgressBarCmp progress={progress} />}
      <SearchBar onChange={onChange} value={searchTerm} />

      {!loading && !error && <ResultsCounter count={products.length} />}

      {error && <div>Error: {error.message}</div>}

      {!loading && !error && products && products.length > 0 ? (
        <div
          className="home-grid"
          role="list"
          aria-label="Product list"
          data-testid="product-list"
        >
          {products.map((product) => (
            <CardSmartphone
              key={product.id}
              product={product}
              handleProductClick={handleProductClick}
            />
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="home-no-products">
          <p className="home-no-products__text">No products available.</p>
        </div>
      ) : null}
    </main>
  );
};
