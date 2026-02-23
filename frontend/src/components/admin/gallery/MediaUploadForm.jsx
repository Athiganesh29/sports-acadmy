import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import FileUploader from '../common/FileUploader';

const categories = ['Training', 'Events', 'Competitions', 'Facilities', 'Team', 'Other'];

const MediaUploadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'photo',
    category: '',
    file: null,
    videoUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('type', formData.type);
      data.append('category', formData.category);

      if (formData.type === 'video' && formData.videoUrl) {
        data.append('videoUrl', formData.videoUrl);
      }
      if (formData.file) {
        data.append('file', formData.file);
      }

      await api.post('/gallery', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Media uploaded successfully');
      setFormData({ title: '', type: 'photo', category: '', file: null, videoUrl: '' });
      if (onSuccess) onSuccess();
    } catch {
      toast.error('Failed to upload media');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Upload Media</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Video URL (only for videos) */}
      {formData.type === 'video' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video URL <span className="text-gray-400">(YouTube, Vimeo, etc.)</span>
          </label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* File Upload */}
      <FileUploader
        onFileSelect={handleFileSelect}
        accept={formData.type === 'video' ? 'video/*' : 'image/*'}
        label={formData.type === 'video' ? 'Upload Video / Thumbnail' : 'Upload Photo'}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </form>
  );
};

export default MediaUploadForm;
