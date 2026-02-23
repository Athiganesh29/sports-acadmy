import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ProgramTable from '../../components/admin/programs/ProgramTable';
import SearchBar from '../../components/admin/common/SearchBar';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/programs');
      setPrograms(data.data || []);
    } catch {
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const sports = [...new Set(programs.map((p) => p.sport).filter(Boolean))];

  const filteredPrograms = programs.filter((program) => {
    const matchSearch =
      program.name?.toLowerCase().includes(search.toLowerCase()) ||
      program.sport?.toLowerCase().includes(search.toLowerCase());
    const matchSport = !sportFilter || program.sport === sportFilter;
    return matchSearch && matchSport;
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
          <Link
            to="/admin/programs/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdAdd className="text-lg" />
            <span>Add Program</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="max-w-sm flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search programs..."
            />
          </div>
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Sports</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        <ProgramTable
          programs={filteredPrograms}
          loading={loading}
          onRefresh={fetchPrograms}
        />
      </div>
    </>
  );
};

export default ProgramsPage;
