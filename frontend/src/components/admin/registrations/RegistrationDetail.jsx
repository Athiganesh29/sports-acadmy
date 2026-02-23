import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import StatusBadge from '../common/StatusBadge';

const RegistrationDetail = ({ registration, onRefresh }) => {
  const [status, setStatus] = useState(registration?.status || 'Pending');
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await api.put(`/registrations/${registration._id}/status`, { status });
      toast.success('Registration status updated');
      if (onRefresh) onRefresh();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (!registration) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        Registration not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Student Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Name" value={registration.studentName || registration.student?.name} />
          <InfoField label="Age" value={registration.studentAge || registration.student?.age} />
          <InfoField label="Gender" value={registration.studentGender || registration.student?.gender} />
          <InfoField label="Date of Birth" value={registration.dateOfBirth ? new Date(registration.dateOfBirth).toLocaleDateString() : 'N/A'} />
        </div>
      </div>

      {/* Parent Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Parent / Guardian Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Parent Name" value={registration.parentName || registration.parent?.name} />
          <InfoField label="Email" value={registration.parentEmail || registration.parent?.email} />
          <InfoField label="Phone" value={registration.parentPhone || registration.parent?.phone} />
          <InfoField label="Address" value={registration.address} />
        </div>
      </div>

      {/* Program Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Program Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Program" value={registration.programName || registration.program?.name} />
          <InfoField label="Sport" value={registration.sport || registration.program?.sport} />
          <InfoField
            label="Registration Date"
            value={new Date(registration.createdAt).toLocaleDateString()}
          />
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Status</p>
            <StatusBadge status={registration.status} />
          </div>
        </div>
      </div>

      {/* Status Update */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Status</h2>
        <div className="flex items-center space-x-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={updating}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {updating ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value || 'N/A'}</p>
  </div>
);

export default RegistrationDetail;
