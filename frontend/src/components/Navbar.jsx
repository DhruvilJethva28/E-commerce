import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import useAuthStore from '../context/authStore';
import useCartStore from '../context/cartStore';
import useThemeStore from '../context/themeStore';
import { PLACEHOLDER_USER_IMAGE } from '../utils/constants';

const Navbar = () => {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const { items } = useCartStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    setIsMenuOpen(false);
  };

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-blue-600';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-white';

  return (
    <nav className={`${bgColor} ${textColor} p-4 shadow-lg sticky top-0 z-50 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-300 transition">
          🛒 DeeCart
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-200 transition flex items-center gap-1">
            <FaHome /> Home
          </Link>

          {isAuthenticated && user?.role === 'admin' && (
            <>
              <Link to="/admin/products" className="hover:text-blue-200 transition">
                Admin Panel
              </Link>
              <Link to="/admin/orders" className="hover:text-blue-200 transition">
                Orders
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="relative hover:text-blue-200 transition flex items-center gap-2">
                <FaShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {items.length}
                  </span>
                )}
              </Link>

              <Link to="/orders" className="hover:text-blue-200 transition">
                My Orders
              </Link>

              <div className="flex items-center gap-3 pl-4 border-l border-blue-400">
                <Link to="/profile" className="hover:text-blue-200 transition flex items-center gap-2">
                  {user?.profilePicture && user.profilePicture !== PLACEHOLDER_USER_IMAGE ? (
                    <img 
                      src={user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:5000${user.profilePicture}`}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                      onError={(e) => e.target.src = PLACEHOLDER_USER_IMAGE}
                    />
                  ) : (
                    <FaUser />
                  )}
                  <span>{user?.name?.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
                  title="Toggle dark mode"
                >
                  {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded hover:bg-red-700 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block hover:text-blue-200 transition py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {isAuthenticated && user?.role === 'admin' && (
            <>
              <Link
                to="/admin/products"
                className="block hover:text-blue-200 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
              <Link
                to="/admin/orders"
                className="block hover:text-blue-200 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block hover:text-blue-200 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-blue-200 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="block hover:text-blue-200 transition py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart /> Cart ({items.length})
              </Link>

              <Link
                to="/orders"
                className="block hover:text-blue-200 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>

              <Link
                to="/profile"
                className="block hover:text-blue-200 transition py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser /> {user?.name}
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left hover:text-blue-200 transition py-2 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
