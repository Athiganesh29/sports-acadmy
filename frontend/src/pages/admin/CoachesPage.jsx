import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import CoachTable from '../../components/admin/coaches/CoachTable';
import SearchBar from '../../components/admin/common/SearchBar';

const CoachesPage = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/coaches');
      setCoaches(data.data || []);
    } catch {
      toast.error('Failed to load coaches');
    } finally {
      setLoading(false);
    }
  };

  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name?.toLowerCase().includes(search.toLowerCase()) ||
      coach.sport?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Coaches</h1>
          <Link
            to="/admin/coaches/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdAdd className="text-lg" />
            <span>Add Coach</span>
          </Link>
        </div>

        <div className="max-w-sm">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search coaches..."
          />
        </div>

        <CoachTable
          coaches={filteredCoaches}
          loading={loading}
          onRefresh={fetchCoaches}
        />
      </div>
    </>
  );
};

export default CoachesPage;
