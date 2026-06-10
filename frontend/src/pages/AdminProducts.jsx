import React, { useEffect, useState } from 'react';
import { productAPI, categoryAPI } from '../utils/api';
import useThemeStore from '../context/themeStore';
import toast from 'react-hot-toast';
import { FaTag, FaTimes } from 'react-icons/fa';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const { isDarkMode } = useThemeStore();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    discount: 0,
    isFeatured: false,
    image: null,
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      let cats = response.data.categories || [];
      
      console.log('Fetched categories from API:', cats);
      
      // If no categories from API, use fallback defaults
      if (cats.length === 0) {
        console.log('No categories from API, using defaults');
        cats = [
          { _id: '1', name: 'Electronics' },
          { _id: '2', name: 'Fashion' },
          { _id: '3', name: 'Home' },
          { _id: '4', name: 'Sports' },
          { _id: '5', name: 'Books' },
        ];
      }
      
      console.log('Final categories to display:', cats);
      setCategories(cats);
      
      // Set default category if not already set
      if (cats.length > 0 && (!formData.category || formData.category === '')) {
        setFormData(prev => ({
          ...prev,
          category: cats[0].name
        }));
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Fallback to default categories if API fails
      const defaultCats = [
        { _id: '1', name: 'Electronics' },
        { _id: '2', name: 'Fashion' },
        { _id: '3', name: 'Home' },
        { _id: '4', name: 'Sports' },
        { _id: '5', name: 'Books' },
      ];
      console.log('Using fallback categories due to error:', defaultCats);
      setCategories(defaultCats);
      setFormData(prev => ({
        ...prev,
        category: defaultCats[0].name
      }));
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll({});
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      setCreatingCategory(true);
      await categoryAPI.create({
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
      });

      // Refetch all categories to ensure we have the complete list
      await fetchCategories();
      
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowCategoryModal(false);
      toast.success('Category created successfully');
    } catch (error) {
      console.error('Category creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to create category');
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', parseFloat(formData.price));
      submitData.append('category', formData.category);
      submitData.append('stock', parseInt(formData.stock));
      submitData.append('discount', parseInt(formData.discount) || 0);
      submitData.append('isFeatured', formData.isFeatured);
      
      // Append image file if selected
      if (formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      if (editingId) {
        // Update existing product
        await productAPI.update(editingId, submitData);
        toast.success('Product updated successfully');
      } else {
        // Create new product
        await productAPI.create(submitData);
        toast.success('Product created successfully');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || (editingId ? 'Failed to update product' : 'Failed to create product'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productAPI.delete(id);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      discount: product.discount || 0,
      isFeatured: product.isFeatured || false,
      image: null,
    });
    setImagePreview(product.image);
    setEditingId(product._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories.length > 0 ? categories[0].name : '',
      stock: '',
      discount: 0,
      isFeatured: false,
      image: null,
    });
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className={isDarkMode ? 'min-h-screen bg-gray-950 p-4' : 'min-h-screen bg-gray-100 p-4'}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🛍️ Products Management
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition transform active:scale-95"
            >
              ➕ New Category
            </button>
            <button
              onClick={() => {
                if (showForm && !editingId) {
                  setShowForm(false);
                  setImagePreview(null);
                } else if (editingId) {
                  resetForm();
                } else {
                  setShowForm(true);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition transform active:scale-95"
            >
              {showForm ? '✕ Cancel' : '➕ Add Product'}
            </button>
          </div>
        </div>

        {/* Create Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg p-6 w-96 max-w-full`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create New Category
                </h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateCategory}>
                <input
                  type="text"
                  placeholder="Category Name (e.g., Electronics, Fashion)"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className={`w-full border rounded px-4 py-2 mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  required
                />
                
                <textarea
                  placeholder="Description (optional)"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className={`w-full border rounded px-4 py-2 mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  rows="3"
                />

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={creatingCategory}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 font-semibold"
                  >
                    {creatingCategory ? '⏳ Creating...' : '✓ Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showForm && (
          <div className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingId ? '✏️ Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`border rounded px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  required
                />
                <div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories && categories.length > 0 ? (
                      categories.map(cat => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                        <option value="Books">Books</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full border rounded px-4 py-2 mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                rows="3"
                required
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`border rounded px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  step="0.01"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`border rounded px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  required
                />
              </div>

              {/* Discount & Featured Section */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    placeholder="0"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className={`w-full border rounded px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  />
                </div>
                <div className="flex items-end">
                  <label className={`flex items-center gap-2 cursor-pointer`}>
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                    />
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FaTag className="inline mr-1" /> Featured Product
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className={`w-full border rounded px-4 py-2 mb-3 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300'}`}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Image Preview:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-40 w-40 object-cover rounded border-2 border-blue-500"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 font-semibold transform active:scale-95"
              >
                {loading ? '⏳ Saving...' : editingId ? '✓ Update Product' : '✓ Create Product'}
              </button>
            </form>
          </div>
        )}

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          {loading && !showForm ? (
            <div className={`p-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading...
            </div>
          ) : (
            <table className="w-full">
              <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                <tr>
                  <th className={`px-6 py-3 text-left font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Name
                  </th>
                  <th className={`px-6 py-3 text-left font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Category
                  </th>
                  <th className={`px-6 py-3 text-center font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Price
                  </th>
                  <th className={`px-6 py-3 text-center font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Discount
                  </th>
                  <th className={`px-6 py-3 text-center font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Stock
                  </th>
                  <th className={`px-6 py-3 text-center font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Featured
                  </th>
                  <th className={`px-6 py-3 text-center font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition`}>
                    <td className={`px-6 py-3 ${isDarkMode ? 'text-gray-300' : ''}`}>
                      {product.name}
                    </td>
                    <td className={`px-6 py-3 ${isDarkMode ? 'text-gray-300' : ''}`}>
                      {product.category}
                    </td>
                    <td className={`px-6 py-3 text-center ${isDarkMode ? 'text-gray-300' : ''}`}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className={`px-6 py-3 text-center font-semibold ${product.discount > 0 ? 'text-red-600' : isDarkMode ? 'text-gray-300' : ''}`}>
                      {product.discount > 0 ? `${product.discount}% 🔥` : '-'}
                    </td>
                    <td className={`px-6 py-3 text-center ${isDarkMode ? 'text-gray-300' : ''}`}>
                      {product.stock}
                    </td>
                    <td className={`px-6 py-3 text-center ${isDarkMode ? 'text-gray-300' : ''}`}>
                      {product.isFeatured ? '⭐ Yes' : 'No'}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition transform active:scale-95"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition transform active:scale-95"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

