import { useState, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    academyName: '',
    tagline: '',
    phone: [''],
    email: '',
    address: '',
    whatsappNumber: '',
    googleMapUrl: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
    },
    workingHours: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      const settings = data.data || {};
      setFormData({
        academyName: settings.academyName || '',
        tagline: settings.tagline || '',
        phone: settings.phone?.length ? settings.phone : [''],
        email: settings.email || '',
        address: settings.address || '',
        whatsappNumber: settings.whatsappNumber || '',
        googleMapUrl: settings.googleMapUrl || '',
        socialLinks: {
          facebook: settings.socialLinks?.facebook || '',
          instagram: settings.socialLinks?.instagram || '',
          twitter: settings.socialLinks?.twitter || '',
          youtube: settings.socialLinks?.youtube || '',
        },
        workingHours: settings.workingHours || '',
      });
    } catch {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handlePhoneChange = (index, value) => {
    setFormData((prev) => {
      const phone = [...prev.phone];
      phone[index] = value;
      return { ...prev, phone };
    });
  };

  const addPhone = () => {
    setFormData((prev) => ({ ...prev, phone: [...prev.phone, ''] }));
  };

  const removePhone = (index) => {
    setFormData((prev) => ({
      ...prev,
      phone: prev.phone.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put('/settings', {
        ...formData,
        phone: formData.phone.filter(Boolean),
      });
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded w-full" />
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Site Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academy Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Academy Name</label>
          <input
            type="text"
            name="academyName"
            value={formData.academyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
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

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="+1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Phone Numbers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Numbers</label>
        <div className="space-y-2">
          {formData.phone.map((phone, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="Enter phone number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.phone.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <MdClose className="text-lg" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPhone}
            className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <MdAdd className="text-lg" />
            <span>Add Phone</span>
          </button>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Google Map URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Google Map URL</label>
        <input
          type="url"
          name="googleMapUrl"
          value={formData.googleMapUrl}
          onChange={handleChange}
          placeholder="https://maps.google.com/..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.socialLinks).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key}
              </label>
              <input
                type="url"
                name={key}
                value={value}
                onChange={handleSocialChange}
                placeholder={`https://${key}.com/...`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
        <input
          type="text"
          name="workingHours"
          value={formData.workingHours}
          onChange={handleChange}
          placeholder="e.g. Mon-Fri: 6AM-9PM, Sat-Sun: 7AM-6PM"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
};

export default SiteSettings;
