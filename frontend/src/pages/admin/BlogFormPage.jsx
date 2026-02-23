import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import BlogEditor from '../../components/admin/blogs/BlogEditor';

const BlogFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data } = await api.get(`/blogs/${id}`);
      setBlog(data.data);
    } catch {
      toast.error('Failed to load blog post');
      navigate('/admin/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await api.put(`/blogs/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Blog post updated successfully');
      } else {
        await api.post('/blogs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Blog post created successfully');
      }
      navigate('/admin/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save blog post');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/blogs"
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MdArrowBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Blog Post' : 'Create New Post'}
          </h1>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-64 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
          </div>
        ) : (
          <BlogEditor initialData={blog} onSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default BlogFormPage;
