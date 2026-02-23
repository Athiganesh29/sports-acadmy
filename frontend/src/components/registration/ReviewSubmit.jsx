import { MdCheckCircle } from 'react-icons/md';

const ReviewRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-gray-500 sm:w-40 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-900 mt-0.5 sm:mt-0">{value}</span>
    </div>
  );
};

const ReviewSubmit = ({ formData, submitting, onSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        <MdCheckCircle className="text-blue-600" />
        Review &amp; Submit
      </h2>
      <p className="text-gray-500 text-sm mb-6">Step 4 of 4 &mdash; Review your information before submitting</p>

      <div className="space-y-6">
        {/* Student Info */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
            Student Information
          </h3>
          <ReviewRow label="First Name" value={formData.firstName} />
          <ReviewRow label="Last Name" value={formData.lastName} />
          <ReviewRow label="Date of Birth" value={formData.dateOfBirth} />
          <ReviewRow label="Gender" value={formData.gender} />
          <ReviewRow
            label="Photo"
            value={formData.photo ? formData.photo.name || 'Uploaded' : 'Not provided'}
          />
        </div>

        {/* Parent Info */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
            Parent / Guardian Information
          </h3>
          <ReviewRow label="Name" value={formData.parentName} />
          <ReviewRow label="Relationship" value={formData.relationship} />
          <ReviewRow label="Phone" value={formData.parentPhone} />
          <ReviewRow label="Email" value={formData.parentEmail} />
          <ReviewRow label="Address" value={formData.address} />
        </div>

        {/* Program Info */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
            Selected Program
          </h3>
          <ReviewRow label="Program" value={formData.programName || formData.programId} />
        </div>

        {/* Submit button */}
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
