import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI, cartAPI } from '../utils/api';
import { FaStar, FaShoppingCart, FaCheck, FaTruck } from 'react-icons/fa';
import useCartStore from '../context/cartStore';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data.product);
    } catch (error) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error('Not enough stock');
      return;
    }
    addItem({
      product,
      quantity,
    });
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      setSubmittingReview(true);
      await productAPI.addReview(id, { rating, comment });
      toast.success('Review added successfully');
      setComment('');
      setRating(5);
      fetchProduct();
    } catch (error) {
      toast.error('Failed to add review');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Ensure image has full URL
  const imageUrl = product?.image && !product.image.startsWith('http') && !product.image.startsWith('data:')
    ? `http://localhost:5000${product.image}`
    : product?.image;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link to="/" className="text-blue-600 hover:underline">{product.category}</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Image Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover hover:scale-105 transition duration-300"
              />
            </div>
            {/* Stock Badge */}
            <div className="bg-white rounded-lg shadow-md p-4">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheck size={20} />
                  <span className="font-semibold">In Stock ({product.stock})</span>
                </div>
              ) : (
                <div className="text-red-600 font-semibold">Out of Stock</div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      fill={i < Math.round(product.rating) ? '#FFA500' : '#E0E0E0'}
                      color={i < Math.round(product.rating) ? '#FFA500' : '#E0E0E0'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} out of 5
                </span>
                <span className="text-sm text-gray-600">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-green-600 font-semibold">Free delivery</p>
              </div>

              {/* Description */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Details */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-3">Product Details:</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Category:</span> <span className="font-semibold">{product.category}</span></p>
                  <p><span className="text-gray-600">SKU:</span> <span className="font-semibold">{product._id?.substring(0, 8)}</span></p>
                  <p><span className="text-gray-600">Stock Available:</span> <span className="font-semibold">{product.stock} units</span></p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">Quantity:</label>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 border border-gray-300 rounded px-3 py-2 text-center font-semibold"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600 ml-4">(Max {product.stock})</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <FaTruck className="text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Free Delivery</p>
                  <p className="text-gray-600">Typically arrives in 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Existing Reviews */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{review.userName}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                size={14}
                                fill={i < review.rating ? '#FFA500' : '#E0E0E0'}
                                color={i < review.rating ? '#FFA500' : '#E0E0E0'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Review Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Your Rating</label>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-3xl transition"
                      >
                        <FaStar
                          fill={star <= rating ? '#FFA500' : '#E0E0E0'}
                          color={star <= rating ? '#FFA500' : '#E0E0E0'}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 text-center">{rating} out of 5</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Your Review</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
