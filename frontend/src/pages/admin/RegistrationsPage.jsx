import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import RegistrationTable from '../../components/admin/registrations/RegistrationTable';
import SearchBar from '../../components/admin/common/SearchBar';
import ExportCSV from '../../components/admin/registrations/ExportCSV';

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/registrations');
      setRegistrations(data.data || []);
    } catch {
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const name = reg.studentName || reg.student?.name || '';
    const program = reg.programName || reg.program?.name || '';
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      program.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || reg.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 max-w-sm">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search registrations..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <ExportCSV />
        </div>

        <RegistrationTable registrations={filteredRegistrations} loading={loading} />
      </div>
    </>
  );
};

export default RegistrationsPage;
