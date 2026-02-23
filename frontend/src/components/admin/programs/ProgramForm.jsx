import { useState, useEffect } from 'react';
import api from '../../../services/api';
import FileUploader from '../common/FileUploader';

const ageGroups = [
  'Under 6',
  'Under 8',
  'Under 10',
  'Under 12',
  'Under 14',
  'Under 16',
  'Under 18',
  'Adults',
  'All Ages',
];

const ProgramForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    ageGroup: '',
    description: '',
    duration: '',
    fee: '',
    coach: '',
    image: null,
  });
  const [coaches, setCoaches] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCoaches();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        sport: initialData.sport || '',
        ageGroup: initialData.ageGroup || '',
        description: initialData.description || '',
        duration: initialData.duration || '',
        fee: initialData.fee || '',
        coach: initialData.coach?._id || initialData.coach || '',
        image: null,
      });
    }
  }, [initialData]);

  const fetchCoaches = async () => {
    try {
      const { data } = await api.get('/coaches');
      setCoaches(data.data || []);
    } catch {
      setCoaches([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('sport', formData.sport);
    data.append('ageGroup', formData.ageGroup);
    data.append('description', formData.description);
    data.append('duration', formData.duration);
    data.append('fee', formData.fee);
    data.append('coach', formData.coach);
    if (formData.image) {
      data.append('image', formData.image);
    }

    await onSubmit(data);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
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

        {/* Age Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select age group</option>
            {ageGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 3 months"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fee ($)</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Coach */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
          <select
            name="coach"
            value={formData.coach}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select coach</option>
            {coaches.map((coach) => (
              <option key={coach._id} value={coach._id}>
                {coach.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Image Upload */}
      <FileUploader
        onFileSelect={handleFileSelect}
        accept="image/*"
        label="Program Image"
      />
      {initialData?.image && !formData.image && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Current image:</p>
          <img
            src={initialData.image}
            alt="Current"
            className="w-24 h-24 rounded-lg object-cover"
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
          {submitting ? 'Saving...' : initialData ? 'Update Program' : 'Add Program'}
        </button>
      </div>
    </form>
  );
};

export default ProgramForm;
