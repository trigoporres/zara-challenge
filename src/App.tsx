import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './views';
import { Details } from './views/Details';
import { CartProvider } from './contexts/CartContext';
import { Cart } from './views/Cart';
import { AppHeader } from './components/header/AppHeader';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
