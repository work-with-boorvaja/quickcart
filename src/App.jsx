import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {

  // State for cart items
  const [cart, setCart] = useState([]);

  // State for cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add product to cart
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    // Check if product already exists
    const existingItem = cart.find(
      item => item.id === product.id
    );

    if (existingItem) {

      // Increase quantity if product exists
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      // Add new product with quantity 1
      setCart([
        ...cart,
        { ...product, quantity: 1 }
      ]);

    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    console.log('Removing from cart:', id);
    setCart(cart.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    console.log('Updating quantity:', id, quantity);
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      removeFromCart(id);
    } else {
      // Update quantity
      setCart(
        cart.map(item =>
          item.id === id
            ? { ...item, quantity: quantity }
            : item
        )
      );
    }
  };

  // Toggle cart open/close
  const toggleCart = () => {
    console.log('Toggling cart, current state:', isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      <main className="main-content">
        <ProductList
          products={products}
          onAddToCart={addToCart}
        />
      </main>
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;