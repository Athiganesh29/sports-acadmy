import { Link } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';

const RegistrationTable = ({ registrations, loading }) => {
  const columns = [
    {
      key: 'regId',
      label: 'Reg. ID',
      render: (value, row) => (
        <span className="font-mono text-xs text-gray-600">
          {value || row._id?.slice(-8).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'studentName',
      label: 'Student Name',
      render: (value, row) => value || row.student?.name || 'N/A',
    },
    {
      key: 'programName',
      label: 'Program',
      render: (value, row) => value || row.program?.name || 'N/A',
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Link
          to={`/admin/registrations/${row._id}`}
          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <MdVisibility className="text-lg" />
          <span>View</span>
        </Link>
      ),
    },
  ];

  return <DataTable columns={columns} data={registrations} loading={loading} />;
};

export default RegistrationTable;
