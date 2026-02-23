import { MdFamilyRestroom } from 'react-icons/md';

const ParentDetails = ({ formData, onChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        <MdFamilyRestroom className="text-blue-600" />
        Parent / Guardian Details
      </h2>
      <p className="text-gray-500 text-sm mb-6">Step 2 of 4 &mdash; Enter parent or guardian information</p>

      <div className="space-y-4">
        {/* Parent Name */}
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
            Parent / Guardian Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName || ''}
            onChange={onChange}
            required
            placeholder="Enter parent or guardian name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Relationship */}
        <div>
          <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
            Relationship <span className="text-red-500">*</span>
          </label>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship || ''}
            onChange={onChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="">Select relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="parentPhone"
            name="parentPhone"
            value={formData.parentPhone || ''}
            onChange={onChange}
            required
            placeholder="Enter phone number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="parentEmail"
            name="parentEmail"
            value={formData.parentEmail || ''}
            onChange={onChange}
            required
            placeholder="Enter email address"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={onChange}
            required
            rows={3}
            placeholder="Enter full address"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ParentDetails;
