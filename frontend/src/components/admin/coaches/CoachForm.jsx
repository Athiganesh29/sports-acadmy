import { useState, useEffect } from 'react';
import FileUploader from '../common/FileUploader';

const CoachForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    experience: '',
    bio: '',
    email: '',
    phone: '',
    certifications: '',
    photo: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        sport: initialData.sport || '',
        experience: initialData.experience || '',
        bio: initialData.bio || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        certifications: Array.isArray(initialData.certifications)
          ? initialData.certifications.join(', ')
          : initialData.certifications || '',
        photo: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('sport', formData.sport);
    data.append('experience', formData.experience);
    data.append('bio', formData.bio);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append(
      'certifications',
      JSON.stringify(
        formData.certifications
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean)
      )
    );
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    await onSubmit(data);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
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

        {/* Sport */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
          <input
            type="text"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 5 years"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="e.g. FIFA License, UEFA B"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Photo Upload */}
      <FileUploader
        onFileSelect={handleFileSelect}
        accept="image/*"
        label="Coach Photo"
      />
      {initialData?.photo && !formData.photo && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Current photo:</p>
          <img
            src={initialData.photo}
            alt="Current"
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Saving...' : initialData ? 'Update Coach' : 'Add Coach'}
        </button>
      </div>
    </form>
  );
};

export default CoachForm;
