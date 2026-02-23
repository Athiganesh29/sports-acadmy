import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import DataTable from '../common/DataTable';

const CoachTable = ({ coaches, loading, onRefresh }) => {
  const handleToggleStatus = async (coach) => {
    try {
      await api.put(`/coaches/${coach._id}`, {
        isActive: !coach.isActive,
      });
      toast.success(`Coach ${coach.isActive ? 'deactivated' : 'activated'} successfully`);
      onRefresh();
    } catch {
      toast.error('Failed to update coach status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/coaches/${id}`);
      toast.success('Coach deleted successfully');
      onRefresh();
    } catch {
      toast.error('Failed to delete coach');
    }
  };

  const columns = [
    {
      key: 'photo',
      label: 'Photo',
      render: (value) => (
        <img
          src={value || '/placeholder-avatar.png'}
          alt="Coach"
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'sport', label: 'Sport' },
    { key: 'experience', label: 'Experience' },
    {
      key: 'isActive',
      label: 'Status',
      render: (value, row) => (
        <button
          onClick={() => handleToggleStatus(row)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/admin/coaches/edit/${row._id}`}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <MdEdit className="text-lg" />
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={coaches} loading={loading} />;
};

export default CoachTable;
