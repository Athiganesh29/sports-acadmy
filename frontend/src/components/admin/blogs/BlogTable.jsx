import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';

const BlogTable = ({ blogs, loading, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog post deleted successfully');
      onRefresh();
    } catch {
      toast.error('Failed to delete blog post');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value) => (
        <span className="font-medium text-gray-900 line-clamp-1">{value}</span>
      ),
    },
    {
      key: 'author',
      label: 'Author',
      render: (value) => (typeof value === 'object' ? value?.name : value) || 'N/A',
    },
    {
      key: 'isPublished',
      label: 'Status',
      render: (value) => (
        <StatusBadge status={value ? 'Published' : 'Draft'} />
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/admin/blogs/edit/${row._id}`}
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

  return <DataTable columns={columns} data={blogs} loading={loading} />;
};

export default BlogTable;
