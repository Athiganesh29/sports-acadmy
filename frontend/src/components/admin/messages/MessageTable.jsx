import { Link } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';
import DataTable from '../common/DataTable';

const MessageTable = ({ messages, loading }) => {
  const columns = [
    {
      key: 'isRead',
      label: '',
      render: (value) => (
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full ${
            value ? 'bg-gray-300' : 'bg-blue-500'
          }`}
          title={value ? 'Read' : 'Unread'}
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'subject',
      label: 'Subject',
      render: (value, row) => (
        <span className={!row.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}>
          {value || 'No subject'}
        </span>
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
        <Link
          to={`/admin/messages/${row._id}`}
          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <MdVisibility className="text-lg" />
          <span>View</span>
        </Link>
      ),
    },
  ];

  return <DataTable columns={columns} data={messages} loading={loading} />;
};

export default MessageTable;
