import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import RegistrationDetail from '../../components/admin/registrations/RegistrationDetail';

const RegistrationDetailPage = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistration();
  }, [id]);

  const fetchRegistration = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/registrations/${id}`);
      setRegistration(data.data);
    } catch {
      toast.error('Failed to load registration details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/registrations"
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MdArrowBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Registration Details</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-3">
                <div className="h-5 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <RegistrationDetail registration={registration} onRefresh={fetchRegistration} />
        )}
      </div>
    </>
  );
};

export default RegistrationDetailPage;
