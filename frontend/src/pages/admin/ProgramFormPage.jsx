import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ProgramForm from '../../components/admin/programs/ProgramForm';

const ProgramFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    try {
      const { data } = await api.get(`/programs/${id}`);
      setProgram(data.data);
    } catch {
      toast.error('Failed to load program data');
      navigate('/admin/programs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await api.put(`/programs/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Program updated successfully');
      } else {
        await api.post('/programs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Program added successfully');
      }
      navigate('/admin/programs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save program');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/programs"
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MdArrowBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Program' : 'Add New Program'}
          </h1>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded w-full" />
            ))}
          </div>
        ) : (
          <ProgramForm initialData={program} onSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default ProgramFormPage;
