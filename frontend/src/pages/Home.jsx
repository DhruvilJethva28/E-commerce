import React, { useEffect, useState } from 'react';
import { productAPI, cartAPI, categoryAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import SalesBanner from '../components/SalesBanner';
import useCartStore from '../context/cartStore';
import useThemeStore from '../context/themeStore';
import toast from 'react-hot-toast';
import { FaBox, FaSync } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const { addItem } = useCartStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    
    // Auto-refresh products when page comes into focus
    const handleFocus = () => {
      fetchCategories();
      fetchProducts();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, [category, search]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      const cats = response.data.categories || [];
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll({
        category: category || undefined,
        search: search || undefined,
      });
      setProducts(response.data.products || []);
    } catch (error) {
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await cartAPI.add({ productId: product._id, quantity: 1 });
      addItem({
        product,
        quantity: 1,
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await productAPI.getAll({
        category: category || undefined,
        search: search || undefined,
      });
      setProducts(response.data.products || []);
      toast.success('Products refreshed!');
    } catch (error) {
      toast.error('Failed to refresh products');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className={isDarkMode ? 'bg-gray-950 min-h-screen' : 'bg-gray-100 min-h-screen'}>
      {/* Sales Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <SalesBanner />
      </div>

      {/* Search and Filter Section */}
      <div className={isDarkMode ? 'bg-gray-800 p-6 shadow sticky top-16 z-40' : 'bg-white p-6 shadow sticky top-16 z-40'}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Shop Our Products
          </h1>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full border-2 rounded px-4 py-2 focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400'
                      : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`border-2 rounded px-4 py-2 focus:outline-none transition ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                    : 'border-gray-300 focus:border-blue-600'
                }`}
              >
                <option value="">📦 All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded font-semibold transition transform active:scale-95 ${
                refreshing
                  ? `${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'} cursor-not-allowed`
                  : `${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`
              }`}
            >
              <FaSync size={16} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : '🔄 Refresh Products'}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-600 text-lg'}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
            <FaBox size={80} className="mx-auto text-gray-300 mb-4" />
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              No Products Found
            </h2>
            <p className={isDarkMode ? 'text-gray-400 text-lg mb-6' : 'text-gray-600 text-lg mb-6'}>
              {search 
                ? `No products match "${search}". Try a different search term.`
                : category
                ? `No products in the ${category} category yet. Check back soon!`
                : 'Products are being loaded. Check back soon!'}
            </p>
            <div className="space-y-3">
              <p className={isDarkMode ? 'text-gray-400 mb-4' : 'text-gray-600 mb-4'}>
                💡 Admin tip: Run the seeding script to add sample products:
              </p>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded text-left max-w-md mx-auto`}>
                <p className={`font-mono text-sm break-all ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  npm run seed
                </p>
              </div>
              {(search || category) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory('');
                  }}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-4"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Showing <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{products.length}</span> products
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
