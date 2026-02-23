import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import StatusBadge from '../common/StatusBadge';

const RecentRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { data } = await api.get('/dashboard/recent');
        setRegistrations(data.data || []);
      } catch {
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Registrations</h2>
        <Link
          to="/admin/registrations"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
        </Link>
      </div>

      {registrations.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent registrations.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">Student</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">Program</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((reg) => (
                <tr key={reg._id || reg.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700">{reg.studentName || reg.student?.name}</td>
                  <td className="py-2 px-3 text-gray-700">{reg.programName || reg.program?.name}</td>
                  <td className="py-2 px-3 text-gray-500">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    <StatusBadge status={reg.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentRegistrations;
