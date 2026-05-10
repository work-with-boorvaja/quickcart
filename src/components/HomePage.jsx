import React from 'react';
import { useCart } from '../context/CartContext';
import ProductList from './ProductList';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart(); // ← Get from context

  // Filter products based on searchTerm
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* Show filtered count if searching */}
      {searchTerm && (
        <p className="search-results">
          Found {filtered.length} products
        </p>
      )}

      {/* Show ProductList if products exist */}
      <ProductList
        products={filtered}
        onAddToCart={addToCart}
      />

      {/* Show message if no products found */}
      {filtered.length === 0 && (
        <p className="no-results">No products found</p>
      )}

    </div>
  );
}

export default HomePage;