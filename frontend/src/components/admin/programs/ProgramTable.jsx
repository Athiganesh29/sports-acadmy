import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';

const ProgramTable = ({ programs, loading, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/programs/${id}`);
      toast.success('Program deleted successfully');
      onRefresh();
    } catch {
      toast.error('Failed to delete program');
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (value) => (
        <img
          src={value || '/placeholder-program.png'}
          alt="Program"
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'sport', label: 'Sport' },
    { key: 'ageGroup', label: 'Age Group' },
    {
      key: 'fee',
      label: 'Fee',
      render: (value) => <span className="font-medium">${value}</span>,
    },
    {
      key: 'coach',
      label: 'Coach',
      render: (value) => value?.name || 'N/A',
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value) => (
        <StatusBadge status={value ? 'Active' : 'Inactive'} />
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/admin/programs/edit/${row._id}`}
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

  return <DataTable columns={columns} data={programs} loading={loading} />;
};

export default ProgramTable;
