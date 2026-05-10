import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

// Create context
const CartContext = createContext();

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within CartProvider'
    );
  }

  return context;
};

// Provider component
export function CartProvider({ children }) {

  // Cart stored in localStorage
  const [cart, setCart] = useLocalStorage(
    'quickcart-cart',
    []
  );

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  // Loading state
  const [isLoading, setIsLoading] =
    useState(true);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  // Add product to cart
  const addToCart = (product) => {

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }
  };

  // Remove item
  const removeFromCart = (productId) => {

    setCart(
      cart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Update quantity
  const updateQuantity = (
    productId,
    newQuantity
  ) => {

    if (newQuantity <= 0) {

      removeFromCart(productId);

    } else {

      setCart(
        cart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: newQuantity
              }
            : item
        )
      );

    }
  };

  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Total items
  const getTotalItems = () => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  };

  // Total price
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  // Context value
  const value = {
    cart,
    isCartOpen,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}