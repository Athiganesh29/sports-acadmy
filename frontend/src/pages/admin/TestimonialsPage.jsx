import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import TestimonialTable from '../../components/admin/testimonials/TestimonialTable';
import TestimonialForm from '../../components/admin/testimonials/TestimonialForm';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/testimonials/all');
      setTestimonials(data.data || []);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setShowForm(true);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Testimonial updated successfully');
      } else {
        await api.post('/testimonials', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Testimonial added successfully');
      }
      setShowForm(false);
      fetchTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save testimonial');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <button
            onClick={handleAdd}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdAdd className="text-lg" />
            <span>Add Testimonial</span>
          </button>
        </div>

        <TestimonialTable
          testimonials={testimonials}
          loading={loading}
          onEdit={handleEdit}
          onRefresh={fetchTestimonials}
        />

        <TestimonialForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          initialData={editingTestimonial}
        />
      </div>
    </>
  );
};

export default TestimonialsPage;
