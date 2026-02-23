import { MdEdit, MdDelete, MdStar, MdStarBorder } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';

const TestimonialTable = ({ testimonials, loading, onEdit, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Testimonial deleted successfully');
      onRefresh();
    } catch {
      toast.error('Failed to delete testimonial');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <MdStar key={i} className="text-yellow-400 text-sm" />
        ) : (
          <MdStarBorder key={i} className="text-yellow-400 text-sm" />
        )
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => renderStars(value || 0),
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
          <button
            onClick={() => onEdit(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <MdEdit className="text-lg" />
          </button>
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

  return <DataTable columns={columns} data={testimonials} loading={loading} />;
};

export default TestimonialTable;
