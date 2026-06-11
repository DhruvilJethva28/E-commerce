import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import useAuthStore from '../context/authStore';
import useThemeStore from '../context/themeStore';
import toast from 'react-hot-toast';
import { FaCamera } from 'react-icons/fa';
import { PLACEHOLDER_USER_IMAGE, API_BASE_URL } from '../utils/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    profilePicture: null,
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || '',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
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
      
      // Create FormData if profile picture is present
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('address[street]', formData.address.street);
      submitData.append('address[city]', formData.address.city);
      submitData.append('address[state]', formData.address.state);
      submitData.append('address[zipCode]', formData.address.zipCode);
      submitData.append('address[country]', formData.address.country);
      
      if (formData.profilePicture instanceof File) {
        submitData.append('profilePicture', formData.profilePicture);
      }
      
      const response = await authAPI.updateProfile(submitData);
      setUser(response.data.user);
      setIsEditing(false);
      setImagePreview(null);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const cardBg = isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const inputBg = isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={isDarkMode ? 'min-h-screen bg-gray-950 p-4' : 'min-h-screen bg-gray-100 p-4'}>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Profile
        </h1>

        <div className={`${cardBg} rounded-lg shadow p-6`}>
          {!isEditing ? (
            <div>
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src={user.profilePicture ? (user.profilePicture.startsWith('http') ? user.profilePicture : `${API_BASE_URL}${user.profilePicture}`) : PLACEHOLDER_USER_IMAGE}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-lg mb-4"
                  onError={(e) => e.target.src = PLACEHOLDER_USER_IMAGE}
                />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </h2>
              </div>

              <div className="mb-6">
                <p className={`${labelColor} mb-1`}>Email</p>
                <p className="text-xl font-semibold">{user.email}</p>
              </div>

              <div className="mb-6">
                <p className={`${labelColor} mb-1`}>Phone</p>
                <p className="text-xl font-semibold">{user.phone || 'Not provided'}</p>
              </div>

              <div className="mb-6">
                <p className={`${labelColor} mb-1`}>Address</p>
                {user.address?.street ? (
                  <div className={isDarkMode ? 'bg-gray-700 p-4 rounded' : 'bg-gray-50 p-4 rounded'}>
                    <p>{user.address.street}</p>
                    <p>
                      {user.address.city}, {user.address.state} {user.address.zipCode}
                    </p>
                    <p>{user.address.country}</p>
                  </div>
                ) : (
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No address provided</p>
                )}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition transform active:scale-95"
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Profile Picture Upload Section */}
              <div className="mb-6">
                <label className={`block ${labelColor} font-semibold mb-3`}>Profile Picture</label>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <img
                      src={imagePreview || (user.profilePicture ? (user.profilePicture.startsWith('http') ? user.profilePicture : `${API_BASE_URL}${user.profilePicture}`) : PLACEHOLDER_USER_IMAGE)}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                      onError={(e) => e.target.src = PLACEHOLDER_USER_IMAGE}
                    />
                    <label className={`absolute bottom-2 right-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition shadow-lg`}>
                      <FaCamera size={20} />
                      <input
                        type="file"
                        name="profilePicture"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <p className="text-sm text-green-600 font-semibold">✓ New image selected</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className={`block ${labelColor} font-semibold mb-2`}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${inputBg}`}
                  required
                />
              </div>

              <div className="mb-4">
                <label className={`block ${labelColor} font-semibold mb-2`}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${inputBg}`}
                />
              </div>

              <div className="mb-4">
                <label className={`block ${labelColor} font-semibold mb-2`}>Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${inputBg}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block ${labelColor} font-semibold mb-2`}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2 ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`block ${labelColor} font-semibold mb-2`}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2 ${inputBg}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={`block ${labelColor} font-semibold mb-2`}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2 ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`block ${labelColor} font-semibold mb-2`}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2 ${inputBg}`}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold transform active:scale-95"
                >
                  {loading ? 'Saving...' : '✓ Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setImagePreview(null);
                  }}
                  className={`flex-1 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-400 hover:bg-gray-500'} text-white py-2 rounded transition font-semibold transform active:scale-95`}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
