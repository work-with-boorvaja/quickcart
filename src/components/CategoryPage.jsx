import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductList from './ProductList';

function CategoryPage({ products }) {
  const { addToCart } = useCart(); // ← Get from context

  // Get category from URL params
  const { category } = useParams();

  // Filter products by category
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">

      {/* Show category title */}
      <h2 className="category-title">{category} Products</h2>

      {/* Render filtered products or empty state */}
      {filteredProducts.length > 0 ? (
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
        />
      ) : (
        <div className="empty-category">
          <p>😕 No products found in this category</p>
          <Link to="/" className="back-home-link">
            ← Back to all products
          </Link>
        </div>
      )}

    </div>
  );
}

export default CategoryPage;