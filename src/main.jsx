import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'; // ← Add import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>  {/* ← Wrap App */}
      <App />
    </CartProvider>
  </StrictMode>,
)
