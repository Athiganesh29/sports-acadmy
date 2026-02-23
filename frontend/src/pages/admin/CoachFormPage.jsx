import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import CoachForm from '../../components/admin/coaches/CoachForm';

const CoachFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      fetchCoach();
    }
  }, [id]);

  const fetchCoach = async () => {
    try {
      const { data } = await api.get(`/coaches/${id}`);
      setCoach(data.data);
    } catch {
      toast.error('Failed to load coach data');
      navigate('/admin/coaches');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await api.put(`/coaches/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Coach updated successfully');
      } else {
        await api.post('/coaches', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Coach added successfully');
      }
      navigate('/admin/coaches');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save coach');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/coaches"
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MdArrowBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Coach' : 'Add New Coach'}
          </h1>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded w-full" />
            ))}
          </div>
        ) : (
          <CoachForm initialData={coach} onSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default CoachFormPage;
