import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaTag } from 'react-icons/fa';
import useThemeStore from '../context/themeStore';
import { API_BASE_URL } from '../utils/constants';

const ProductCard = ({ product, onAddToCart }) => {
  const { isDarkMode } = useThemeStore();
  
  // Ensure discount is a number, default to 0 if undefined
  const discount = product.discount || 0;
  const discountedPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
  const savings = discount > 0 ? product.price - discountedPrice : 0;

  // Ensure image has full URL
  const imageUrl = product.image && !product.image.startsWith('http') && !product.image.startsWith('data:')
    ? `${API_BASE_URL}${product.image}`
    : product.image;

  const cardBg = isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900';
  const descText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverText = isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600';

  return (
    <div className={`${cardBg} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-200`}>
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover hover:opacity-80 transition cursor-pointer"
          />
        </Link>
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1 animate-pulse shadow-lg">
            <FaTag size={14} />
            {discount}% OFF
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            ⭐ FEATURED
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className={`text-lg font-semibold truncate ${hoverText}`}>
            {product.name}
          </h3>
        </Link>
        <p className={`${descText} text-sm mt-2 line-clamp-2`}>
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={16}
                fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className={`text-sm ${descText}`}>({product.reviews?.length || 0})</span>
        </div>

        <div className="mt-4">
          {discount > 0 ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-green-600 font-semibold">
                Save ${savings.toFixed(2)}
              </p>
            </div>
          ) : (
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className={`text-sm ${descText} mt-2`}>
          Stock: <span className={product.stock > 10 ? 'text-green-600 font-bold' : product.stock > 0 ? 'text-orange-600 font-bold' : 'text-red-600 font-bold'}>
            {product.stock}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`w-full mt-4 ${
            product.stock === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          } text-white py-2 rounded transition transform duration-200`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
