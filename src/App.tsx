import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './views'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<div>Página de detalles</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
