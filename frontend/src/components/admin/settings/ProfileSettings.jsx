import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import useAuth from '../../../hooks/useAuth';
import FileUploader from '../common/FileUploader';

const ProfileSettings = () => {
  const { admin, checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || '',
        email: admin.email || '',
        avatar: null,
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }

      await api.put('/admin/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile updated successfully');
      checkAuth();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Profile Settings</h2>

      {/* Current avatar */}
      {admin?.avatar && (
        <div className="flex items-center space-x-4">
          <img
            src={admin.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <p className="text-sm text-gray-500">Current avatar</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Avatar Upload */}
      <FileUploader
        onFileSelect={handleFileSelect}
        accept="image/*"
        label="Upload New Avatar"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;
