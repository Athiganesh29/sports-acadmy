const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  published: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  read: 'bg-blue-100 text-blue-800',
  unread: 'bg-gray-100 text-gray-800',
};

const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase() || 'pending';
  const colorClass = statusColors[normalized] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
