import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { CartProvider } from './contexts/CartContext';
import { AppHeader } from './components/header/AppHeader';

const Home = lazy(() =>
  import('./views/Home').then((m) => ({ default: m.Home })),
);
const Details = lazy(() =>
  import('./views/Details').then((m) => ({ default: m.Details })),
);
const Cart = lazy(() =>
  import('./views/Cart').then((m) => ({ default: m.Cart })),
);

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/product/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
