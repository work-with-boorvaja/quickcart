import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ← Add import
import '../styles/Header.css';

function Header({ searchTerm, onSearchChange }) {
  const { getTotalItems, toggleCart } = useCart(); // ← Use context

  const navigate = useNavigate();

  // Categories
  const categories = [
    'Electronics',
    'Accessories',
    'Home',
    'Sports'
  ];

  return (
    <header className="header">

      <div className="header-container">

        {/* Top Row */}
        <div className="header-top">

          <Link to="/" className="header-logo">
            <div className="header-text">
              <h1 className="header-title">🛒 QuickCart</h1>
              <p className="header-subtitle">
                Your one-stop shop for everything
              </p>
            </div>
          </Link>

          <button
            className="cart-icon-btn"
            onClick={toggleCart}
          >
            🛒

            {getTotalItems() > 0 && (
              <span className="cart-badge">
                {getTotalItems()}
              </span>
            )}
          </button>

        </div>

        {/* Navigation Menu */}
        <nav className="header-nav">

          <Link to="/" className="nav-link">
            Home
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="nav-link"
            >
              {cat}
            </Link>
          ))}

          <Link to="/cart" className="nav-link">
            Cart
          </Link>

        </nav>

        {/* Search Bar */}
        <div className="search-container">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
              navigate('/');
            }}
            className="search-input"
          />

        </div>

      </div>

    </header>
  );
}

export default Header;