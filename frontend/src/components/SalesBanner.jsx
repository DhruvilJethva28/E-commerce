import React, { useEffect, useState } from 'react';
import { FaTag } from 'react-icons/fa';
import { productAPI } from '../utils/api';

const SalesBanner = () => {
  const [maxDiscount, setMaxDiscount] = useState(0);

  useEffect(() => {
    fetchMaxDiscount();
  }, []);

  const fetchMaxDiscount = async () => {
    try {
      const response = await productAPI.getAll({});
      if (response.data.products && response.data.products.length > 0) {
        const max = Math.max(
          ...response.data.products.map(p => p.discount || 0)
        );
        setMaxDiscount(max);
      }
    } catch (error) {
      console.error('Failed to fetch discount data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white p-6 mb-8 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <FaTag size={32} className="animate-bounce" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">🔥 SPECIAL SALE! 🔥</h2>
              <p className="text-sm md:text-base opacity-90">
                Get up to {maxDiscount > 0 ? maxDiscount : 50}% off on selected items
              </p>
            </div>
          </div>
          <div className="bg-yellow-400 text-red-600 px-6 py-3 rounded-full font-bold text-lg animate-pulse">
            LIMITED TIME
          </div>
        </div>
        <div className="mt-4 bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-center text-sm">
            ⏰ <strong>Don't miss out!</strong> {maxDiscount > 0 ? `Up to ${maxDiscount}% discount available now!` : 'Discounts are updated regularly.'} Check our featured products below!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesBanner;
