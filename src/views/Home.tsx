import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useProgressBar } from '../hooks/useProgressBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProgressBarCmp } from '../components/ProgressBar';
import styled from 'styled-components';
import { CardSmartphone } from '../components/cardSmartphone/CardSmartphone';
import { SearchBar } from '../components/SearchBar';
import { ResultsCounter } from '../components/ResultsCounter';
import { useDebounce } from '../hooks/useDebounce';

const Container = styled.main`
  /* Content */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  position: absolute;
  width: 1920px;
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
`;

const Grid = styled.div`
  /* Grid */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px 100px;
  row-gap: 0px;
  column-gap: 0px;

  width: 100%;
  box-sizing: border-box;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  /* Responsive padding */
  @media (max-width: 1200px) {
    padding: 0px 60px;
  }

  @media (max-width: 900px) {
    padding: 0px 40px;
  }

  @media (max-width: 600px) {
    padding: 0px 20px;
  }
`;

const NoProductsContainer = styled.div`
  width: 100%;
  padding: 8px 100px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 8px 60px;
  }

  @media (max-width: 900px) {
    padding: 8px 40px;
  }

  @media (max-width: 600px) {
    padding: 8px 20px;
  }
`;

const NoProductsText = styled.p`
  margin: 0;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: #000000;
`;

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
    <Container>
      {loading && <ProgressBarCmp progress={progress} />}
      <SearchBar onChange={onChange} value={searchTerm} />

      {!loading && !error && <ResultsCounter count={products.length} />}

      {error && <div>Error: {error.message}</div>}

      {!loading && !error && products && products.length > 0 ? (
        <Grid>
          {products.map((product) => (
            <CardSmartphone
              key={product.id}
              product={product}
              handleProductClick={handleProductClick}
            />
          ))}
        </Grid>
      ) : !loading && !error ? (
        <NoProductsContainer>
          <NoProductsText>No products available.</NoProductsText>
        </NoProductsContainer>
      ) : null}
    </Container>
  );
};
